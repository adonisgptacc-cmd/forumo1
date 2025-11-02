import pino from 'pino';
import type { Logger, LoggerOptions } from 'pino';
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor(options: LoggerOptions = {}) {
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: { colorize: true, singleLine: false },
            }
          : undefined,
      ...options,
    });
  }

  log(message: unknown, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: unknown, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message);
  }

  warn(message: unknown, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug(message: unknown, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose(message: unknown, context?: string) {
    this.logger.trace({ context }, message);
  }

  child(bindings: Record<string, unknown>): LoggerService {
    const childLogger = this.logger.child(bindings);
    const service = new LoggerService();
    (service as unknown as { logger: Logger }).logger = childLogger;
    return service;
  }
}
