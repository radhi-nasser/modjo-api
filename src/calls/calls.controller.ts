import { Controller, Get, Param, Query } from '@nestjs/common';
import { CallsService } from './calls.service';
import { ApiResponse } from '@nestjs/swagger';
import { CallResponseDto, GetCallInputDto } from './call.dto';
import { ResponseClass } from '../libs/decorators/response-class.decorator';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Get()
  @ResponseClass(CallResponseDto)
  @ApiResponse({
    status: 200,
    description: 'Get calls list.',
  })
  async getAllCalls(): Promise<CallResponseDto[]> {
    return this.callsService.getAllCalls();
  }

  @Get(':id')
  @ResponseClass(CallResponseDto)
  @ApiResponse({
    status: 200,
    description: 'Get a call details.',
  })
  @ApiResponse({
    status: 404,
    description: 'Call not found.',
  })
  async getCallById(
    @Param('id') id: string,
    @Query() options: GetCallInputDto,
  ): Promise<CallResponseDto> {
    return this.callsService.getCallById(id, options);
  }
}
