import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaginationRequestDto } from '../pagination-request.dto';
import { PaginationResponceDtoUser } from '../pagination-responce.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(OrdersService) private readonly ordersService: OrdersService,
  ) {}

  @Mutation(() => User)
  async createUsers(
    @Args('createUserDto', { type: () => CreateUserDto })
    createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  @Query(() => PaginationResponceDtoUser, { name: 'user_find_all' })
  async findAll(
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { data, links, totalPages } =
      await this.usersService.findAll(paginationRequestDto);

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

  @Query(() => User, { name: 'user_find_one' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUsers(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserDto', { type: () => UpdateUserDto })
    updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Boolean)
  async removeUsers(@Args('id', { type: () => Int }) id: number) {
    await this.usersService.remove(id);
    return true;
  }

  @ResolveField(() => [Order], { name: 'orders', nullable: true })
  async getOrders(
    @Parent() user: User,
    @Args('paginationRequestDto', { type: () => PaginationRequestDto })
    paginationRequestDto: PaginationRequestDto,
  ) {
    const { items, total } = await this.ordersService.findByUserId(
      user.id,
      paginationRequestDto,
    );
    return items;
  }
}
