import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CallsModule],
  providers: [PrismaService],
})
export class AppModule {}
