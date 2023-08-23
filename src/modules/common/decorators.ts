import { ExecutionContext, applyDecorators, createParamDecorator } from "@nestjs/common";
import { RequestWithIdUser } from "./types";
import { Throttle } from "@nestjs/throttler";

export const IdUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>() as unknown as RequestWithIdUser;
    return req.idUser;
  });

  export const ThrottlePublic = () =>
  applyDecorators(
    Throttle(Number(process.env.API_RATE_LIMITER__LIMIT), Number(process.env.API_RATE_LIMITER__TTL)),
  );