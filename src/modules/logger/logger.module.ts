import { Module } from '@nestjs/common';
import { BunyanLoggerAdapter } from './bunyanLogger.adapter';

@Module({
  providers: [
    {
      provide: 'LOGGER_SERVICE',
      useFactory: (
      ) => {
        return new BunyanLoggerAdapter(
        );
      }
    }
  ],
  exports: ['LOGGER_SERVICE'],
})
export class LoggerModule {}
