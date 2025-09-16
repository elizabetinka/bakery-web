import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './user.resolver';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
