/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoggerPort {
  log(message: string, context?: string, messageData?: Record<string, any>): any;
  info(message: string, context?: string, messageData?: Record<string, any>): any;
  debug(message: string, context?: string, messageData?: Record<string, any>): any;
  warn(message: string, context?: string, messageData?: Record<string, any>): any;
  error(message: string, context?: string, messageData?: Record<string, any>): any;
}
