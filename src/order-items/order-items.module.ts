import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemResolver } from './orderItem.resolver';
import { Pastry } from '../pastries/entities/pastry.entity';
import { Cake } from '../cakes/entities/cake.entity';
import { Order } from '../orders/entities/order.entity';
import { CakesService } from '../cakes/cakes.service';
import { OrdersService } from '../orders/orders.service';
import { PastriesService } from '../pastries/pastries.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, Cake, Pastry, User])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemResolver, CakesService, OrdersService, PastriesService, UsersService],
})
export class OrderItemsModule {}
