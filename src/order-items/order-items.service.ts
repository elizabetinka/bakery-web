import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CakesService } from '../cakes/cakes.service';
import { PastriesService } from '../pastries/pastries.service';
import { OrdersService } from '../orders/orders.service';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class OrderItemsService {

  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @Inject(CakesService) private readonly cakesService: CakesService,
    @Inject(PastriesService) private readonly pastryService: PastriesService,
    @Inject(OrdersService) private readonly ordersService: OrdersService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    if (!createOrderItemDto.cakeId && !createOrderItemDto.patsyId) {
      throw new NotFoundException(`Введите id торта или пироженого`);
    }
    let item;
    if (createOrderItemDto.cakeId){
      item = await this.cakesService.findOne(createOrderItemDto.cakeId);
    } else if (createOrderItemDto.patsyId) {
      item = await this.pastryService.findOne(createOrderItemDto.patsyId);
    }

    if (!item) {
      throw new NotFoundException(`Item with this ID not found`);
    }

    const order = await this.ordersService.findOne(createOrderItemDto.orderId);
    if (!order) {
      throw new NotFoundException(
        `Order with ID ${createOrderItemDto.orderId} not found`,
      );
    }
    let orderItem;

    if (createOrderItemDto.cakeId){
      orderItem = {
        order: order,
        cake: item,
        quantity: createOrderItemDto.quantity,
        itemPrice: item.price,
      };
    } else if (createOrderItemDto.patsyId) {
      orderItem = {
        order: order,
        pastry: item,
        quantity: createOrderItemDto.quantity,
        itemPrice: item.price,
      };
    }

    const real_order = this.orderItemsRepository.create(orderItem);
    return await this.orderItemsRepository.save(real_order);
  }


  async findOne(id: number) {
    if (id) {
      return await this.orderItemsRepository.findOneBy({ id });
    }
  }

  async findByOrderId(orderId: number, paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [items, totalItems] = await this.orderItemsRepository.findAndCount({
      where: { order: { id: orderId } },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items: items, total: totalItems };
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const order = await this.orderItemsRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    Object.assign(order, updateOrderItemDto);
    return await this.orderItemsRepository.save(order);
  }

  async remove(id: number) {
    await this.orderItemsRepository.delete(id);
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.orderItemsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const links = this.generateLinks(page, limit, totalPages);

    return { data, links, totalPages };
  }

  private generateLinks(
    page: number,
    limit: number,
    totalPages: number,
  ): string[] {

    const links: string[] = [];
    const baseUrl = `/api/order-items?limit=${limit}`;

    if (page > 1) {
      links.push(`<${baseUrl}&page=${page - 1}>; rel="prev"`);
    }

    if (page < totalPages) {
      links.push(`<${baseUrl}&page=${page + 1}>; rel="next"`);
    }

    links.push(`<${baseUrl}&page=1>; rel="first"`);
    links.push(`<${baseUrl}&page=${totalPages}>; rel="last"`);

    return links;
  }
}
