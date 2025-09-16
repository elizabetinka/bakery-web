import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { OrderResolver } from './order.resolver';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderItemsService } from '../order-items/order-items.service';
import { CakesService } from '../cakes/cakes.service';
import { PastriesService } from '../pastries/pastries.service';
import { Pastry } from '../pastries/entities/pastry.entity';
import { Cake } from '../cakes/entities/cake.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, OrderItem,Pastry, Cake]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderResolver,
    UsersService,
    OrderItemsService,
    PastriesService,
    CakesService,
  ],
})
export class OrdersModule {}
