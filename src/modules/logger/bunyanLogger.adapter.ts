/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnModuleInit } from '@nestjs/common';
import * as bunyan from 'bunyan';
import { LoggerPort } from './logger.port';

export class BunyanLoggerAdapter implements LoggerPort, OnModuleInit{
  error = this._log('error');

  warn = this._log('warn');

  info = this._log('info');

  log = this._log('info');

  debug = this._log('debug');

  private adapter: bunyan;


  constructor() {

  }
  async onModuleInit() {
    this.adapter = bunyan.createLogger({
      name: 'blog',
      streams: [{ stream: process.stdout, level: 'info' }],
      serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err,
      },
    });
  }

  public level(level: bunyan.LogLevel): void {
    this.adapter.level(level);
  }

  private _log(
    logType: 'debug' | 'info' | 'warn' | 'error',
  ): (message: string, context?: string, messageData?: Record<string, any>) => any {
    //
    return (message: string, context = '', messageData: Record<string, any> = {}): any => {
      const normalizedMessage = this.normalizeMessage(context, messageData);
      this.adapter[logType]({ ...normalizedMessage }, message);
    };
  }

  // TODO why ?
  private normalizeMessage(context: string, messageData: Record<string, any>): Record<string, any> {
    // eslint-disable-next-line no-param-reassign
    messageData.context = context;
    return messageData;
  }
}
