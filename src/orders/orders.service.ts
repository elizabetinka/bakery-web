import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cake } from '../cakes/entities/cake.entity';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PaginationRequestDto } from '../pagination-request.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne(createOrderDto.customer);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createOrderDto.customer} not found`,
      );
    }
    const order = { customer: user, items: [] };
    const real_order = this.orderRepository.create(order);
    return await this.orderRepository.save(real_order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    await this.orderRepository.delete(id);
  }

  async findOne(id: number) {
    if (id) {
      return await this.orderRepository.findOne({
        where: { id },
        relations: {
          customer: true,
          items: true,
        },
      });
    }
  }

  async findByUserId(userId: number, paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [items, totalItems] = await this.orderRepository.findAndCount({
      where: { customer: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
          customer: true,
          items: true,
        },
    });
    return { items: items, total: totalItems };
  }

  async findAll(paginationDto: PaginationRequestDto) {
    const { page = 1, limit = 8 } = paginationDto;
    const [data, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
          customer: true,
          items: true,
        },
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
    const baseUrl = `/api/orders?limit=${limit}`;

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
