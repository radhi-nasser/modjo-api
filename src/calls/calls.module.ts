import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CallsService, PrismaService],
  controllers: [CallsController],
})
export class CallsModule {}
