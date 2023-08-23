import { HttpStatus } from '@nestjs/common';
import { HttpExceptionWarn } from '../../modules/common/exception';

export class AuthException extends HttpExceptionWarn {}

export class AuthUnauthorizedException extends AuthException {
  constructor(metadata?: HttpExceptionWarn['metadata'], message?: string) {
    super(message || 'User Unauthorized', HttpStatus.UNAUTHORIZED, metadata);
  }
}

export class AuthIncorrectConfidentialException extends AuthException {
  constructor(metadata?: HttpExceptionWarn['metadata'], message?: string) {
    super(message || 'Incorrect Email or Password', HttpStatus.UNAUTHORIZED, metadata);
  }
}

export class AuthUserAlreadyExistsException extends AuthException {
  constructor(metadata?: HttpExceptionWarn['metadata'], message?: string) {
    super(message || 'User already exists', HttpStatus.UNAUTHORIZED, metadata);
  }
}
