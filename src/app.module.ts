import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
