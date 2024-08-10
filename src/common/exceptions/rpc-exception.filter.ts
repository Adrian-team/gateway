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

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        messagge: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    response.status(rpcError.status).json({
      status: rpcError.status,
      message: rpcError.message,
    });
  }
}
