import { IsBoolean, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrderStatusList, {
    message: `Possible status value ${OrderStatusList}`,
  })
  @Optional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @Optional()
  paid: boolean = false;
}
