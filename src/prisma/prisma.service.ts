import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('📦 Prisma connected to the database');
    } catch (error) {
      this.logger.error('❌ Error connecting to the database', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('🛑 Prisma disconnected from the database');
    } catch (error) {
      this.logger.error('❌ Error disconnecting from the database', error);
    }
  }
}
