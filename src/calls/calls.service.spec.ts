import { Test, TestingModule } from '@nestjs/testing';
import { CallsService } from './calls.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Call, Summary, Transcript } from '@prisma/client';

describe('CallsService', () => {
  let service: CallsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallsService,
        {
          provide: PrismaService,
          useValue: {
            call: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get(CallsService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCalls', () => {
    it('should return an empty list of calls', async () => {
      // given
      jest.spyOn(prismaService.call, 'findMany').mockResolvedValueOnce([]);

      // when
      const result = await service.getAllCalls();

      // then
      expect(result).toEqual([]);
    });

    it('should return all calls', async () => {
      // given
      const calls: Call[] = [
        {
          id: '1',
          date: new Date(),
          duration: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.call, 'findMany').mockResolvedValueOnce(calls);

      // when
      const result = await service.getAllCalls();

      // then
      expect(result).toEqual(calls);
    });
  });

  describe('getCallById', () => {
    it('should throw NotFoundException if the call is not found', async () => {
      jest.spyOn(prismaService.call, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.getCallById('1', {})).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return a call by ID', async () => {
      // given
      const call: Call = {
        id: '1',
        date: new Date(),
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.call, 'findUnique').mockResolvedValueOnce(call);

      // when
      const result = await service.getCallById('1', {});

      // then
      expect(result).toEqual(call);
    });

    it('should return a call by ID and include transcript', async () => {
      // given
      const call: Call & { transcript: Transcript } = {
        id: '1',
        date: new Date(),
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        transcript: {
          id: '1',
          callId: '1',
          content: 'Lorem ipsum dolor sit amet.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(prismaService.call, 'findUnique').mockResolvedValueOnce(call);

      // when
      const result = await service.getCallById('1', {
        includeTranscript: true,
      });

      // then
      expect(result).toEqual(call);
    });

    it('should return a call by ID and include summary', async () => {
      // given
      const call: Call & { summary: Summary } = {
        id: '1',
        date: new Date(),
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        summary: {
          id: '1',
          callId: '1',
          content: 'Lorem ipsum dolor sit amet.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(prismaService.call, 'findUnique').mockResolvedValueOnce(call);

      // when
      const result = await service.getCallById('1', {
        includeSummary: true,
      });

      // then
      expect(result).toEqual(call);
    });

    it('should return a call by ID and include both transcript and summary', async () => {
      // given
      const call: Call & { transcript: Transcript; summary: Summary } = {
        id: '1',
        date: new Date(),
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        transcript: {
          id: '1',
          callId: '1',
          content: 'Lorem ipsum dolor sit amet.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        summary: {
          id: '1',
          callId: '1',
          content: 'Lorem ipsum dolor sit amet.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(prismaService.call, 'findUnique').mockResolvedValueOnce(call);

      // when
      const result = await service.getCallById('1', {
        includeSummary: true,
      });

      // then
      expect(result).toEqual(call);
    });
  });
});
