/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { HttpException } from '@nestjs/common';

export class HttpExceptionWithMetadata extends HttpException {
  metadata?: Record<string, any>;

  constructor(message: string, status: number, metadata?: Record<string, any>) {
    super(message, status);

    if (metadata) {
      this.metadata = metadata;
    }
  }
}

/**
 * Логгирует ошибку как warning в фильтре HttpExceptionFilter
 * @see {@link HttpException}
 */
export class HttpExceptionWarn extends HttpExceptionWithMetadata {}

/**
 * Логгирует ошибку как info в фильтре HttpExceptionFilter
 * @see {@link HttpException}
 */
export class HttpExceptionInfo extends HttpExceptionWithMetadata {}
