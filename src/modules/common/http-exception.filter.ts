/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import chalk from 'chalk';
import { Request, Response } from 'express';
import { LoggerPort } from '../logger/logger.port';
import { HttpExceptionInfo, HttpExceptionWarn } from './exception';
import { getReqMeta } from './serializers';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerPort) {}

  catch(error: Error & any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal error';

    if (!(error instanceof HttpException) || error.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV !== 'production') {
        message = `${error.name}: ${error.message}`;
        if (error.name === 'QueryFailedError') {
          // подробности ошибки sql
          message = `${error.name}: ${error.message} --> ${error.detail}`;
        }
      }
      this.logger.error(message, this.constructor.name, { error, trace: error.stack, ...getReqMeta(request) });
    } else {
      statusCode = error.getStatus();
      message = error.message;

      if (error instanceof HttpExceptionInfo) {
        this.logger.info(message, this.constructor.name, { error, ...getReqMeta(request) });
      } else if (error instanceof HttpExceptionWarn) {
        this.logger.warn(message, this.constructor.name, { error, ...getReqMeta(request) });
      } else {
        this.logger.error(message, this.constructor.name, { error, ...getReqMeta(request) });
      }
    }
    if (statusCode === HttpStatus.BAD_REQUEST && error.response && error.response.error) {
      message = `${error.response.error}: ${error.response.message}`;

    }
    const responseData = { message, statusCode };

    const logger = new Logger('HTTP');
    const requestUrl = `${request.method} ${request.protocol}://${request.get('host')}${request.originalUrl}`;
    const urlStr = `${chalk.blue(`${requestUrl}`)} - [${chalk.red(statusCode)}]`;
    const responseBodyStr = chalk.white.dim(`${JSON.stringify(responseData)}`);

    logger.log(`${chalk.magenta.italic.dim('RESPONSE')} - ${urlStr} [${chalk.red('ERROR')}] ${responseBodyStr}`);

    response.status(statusCode).json(responseData);
  }
}
