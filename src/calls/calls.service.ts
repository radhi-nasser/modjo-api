import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Call } from '@prisma/client';

@Injectable()
export class CallsService {
  constructor(private prisma: PrismaService) {}

  async getAllCalls(): Promise<Call[]> {
    return this.prisma.call.findMany();
  }

  async getCallById(
    id: string,
    options: { includeTranscript?: boolean; includeSummary?: boolean },
  ): Promise<Call> {
    const call = await this.prisma.call.findUnique({
      where: { id },
      include: {
        transcript: options.includeTranscript,
        summary: options.includeSummary,
      },
    });

    if (!call) {
      throw new NotFoundException();
    }

    return call;
  }
}
