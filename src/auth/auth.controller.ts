import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await firstValueFrom(
        this.authClient.send('auth.register.user', { ...registerUserDto }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await firstValueFrom(
        this.authClient.send('auth.login.user', { ...loginUserDto }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @UseGuards(AuthGuard)
  @Post('verify')
  async verifyToken(@User() user: any) {
    try {
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
