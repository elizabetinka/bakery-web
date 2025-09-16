import { ResolveField, Resolver, Query, Mutation, Args, Int, Parent, Context } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationResponceDtoOrder } from '../pagination-responce.dto';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import DataLoader from 'dataloader';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderItemsService } from '../order-items/order-items.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    @Inject(OrdersService) private readonly ordersService: OrdersService,
    @Inject(OrderItemsService) private readonly orderItemsService: OrderItemsService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Order)
  async createOrders(
    @Args('createOrderDto', { type: () => CreateOrderDto })
    createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.create(createOrderDto);
  }

  @Query(() => PaginationResponceDtoOrder, { name: 'order_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.ordersService.findAll(paginationRequestDto);

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

  @Query(() => Order, { name: 'order_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserDto', { type: () => UpdateOrderDto })
    updateUserDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async removeOrder(@Args('id', { type: () => Int }) id: number) {
    await this.ordersService.remove(id);
    return true;
  }

  @ResolveField(() => User, { name: 'customer' })
  async getCustomer(
    @Parent() order: Order) {
    return await this.usersService.findByOrderId(order.id);
  }

  @ResolveField(() => [OrderItem], { name: 'items', nullable: true })
  async getItems(@Parent() order: Order,
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { items, total } = await this.orderItemsService.findByOrderId(
      order.id,
      paginationRequestDto,
    );
    return items;
  }
}
