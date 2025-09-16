import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationResponceDtoOrderItem } from '../pagination-responce.dto';
import { OrderItemsService } from './order-items.service';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Order } from '../orders/entities/order.entity';
import { Cake } from '../cakes/entities/cake.entity';
import { Pastry } from '../pastries/entities/pastry.entity';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(
    @Inject(OrderItemsService)
    private readonly orderItemService: OrderItemsService,
  ) {}

  @Mutation(() => OrderItem)
  async createOrderItems(
    @Args('createOrderItemDto', { type: () => CreateOrderItemDto })
    createOrderItemDto: CreateOrderItemDto,
  ) {
    return await this.orderItemService.create(createOrderItemDto);
  }

  @Query(() => PaginationResponceDtoOrderItem, { name: 'order_item_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.orderItemService.findAll(paginationRequestDto);

    return {
      data: data,
      meta: {
        totalItems: data.length,
        currentPage: paginationRequestDto.page,
        itemsPerPage: paginationRequestDto.limit,
      },
      total: totalPages,
      links: links.join(', '),
    };
  }

  @Query(() => OrderItem, { name: 'order_item_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.orderItemService.findOne(id);
  }

  @Mutation(() => OrderItem)
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOrderItemDto', { type: () => UpdateOrderItemDto })
    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return await this.orderItemService.update(id, updateOrderItemDto);
  }

  @Mutation(() => Boolean)
  async removeOrder(@Args('id', { type: () => Int }) id: number) {
    await this.orderItemService.remove(id);
    return true;
  }

  @ResolveField(() => Cake, { name: 'cake', nullable: true })
  getCake(@Parent() orderItem: OrderItem) {
    return orderItem.cake;
  }

  @ResolveField(() => Pastry, { name: 'pastry', nullable: true })
  getPastry(@Parent() orderItem: OrderItem) {
    return orderItem.pastry;
  }

  @ResolveField(() => Order, { name: 'order' })
  getOrder(@Parent() orderItem: OrderItem) {
    return orderItem.order;
  }
}
