import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect()
      .then(() => this.logger.log('success prisma connect'))
      .catch(() => this.logger.log('error prisma connect'));
  }

  async onModuleDestroy() {
    await this.$disconnect()
      .then(() => this.logger.log('success prisma disconnect'))
      .catch(() => this.logger.log('error prisma disconnect'));
  }
}
