import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';

interface RPCI {
  status: number;
  message: string;
}

@Catch(RpcException)
export class rpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const rpcError = exception.getError() as RPCI;

    response.status(rpcError.status).json({
      status: rpcError.status,
      message: rpcError.message,
    });
  }
}
