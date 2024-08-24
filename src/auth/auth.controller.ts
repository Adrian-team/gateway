import { Controller, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  registerUser(@Query() paginationDto: PaginationDto) {
    return this.authClient.send('auth.register.user', { ...paginationDto });
  }
  @Post('login')
  loginUser(@Query() paginationDto: PaginationDto) {
    return this.authClient.send('auth.login.user', { ...paginationDto });
  }
  @Post('verify')
  verifyToken(@Query() paginationDto: PaginationDto) {
    return this.authClient.send('auth.verify.user', { ...paginationDto });
  }
}
