import { HttpStatus } from '@nestjs/common';
import { HttpExceptionWarn } from '../../../modules/common/exception';

export class UserException extends HttpExceptionWarn {}

export class UserNotFoundException extends UserException {
  constructor(metadata?: HttpExceptionWarn['metadata']) {
    super('User not found', HttpStatus.NOT_FOUND, metadata);
  }
}
