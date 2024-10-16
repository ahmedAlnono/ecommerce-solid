import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserIdentity = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request['user'];
  },
);
