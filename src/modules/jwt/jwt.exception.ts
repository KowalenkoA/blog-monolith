import { HttpStatus } from '@nestjs/common';
import { HttpExceptionWarn } from '../common/exception';

export class JwtException extends HttpExceptionWarn {}

export class JwtTokenException extends JwtException {
  constructor(metadata?: HttpExceptionWarn['metadata']) {
    super(`Jwt token is not valid`, HttpStatus.BAD_REQUEST, metadata);
  }
}
