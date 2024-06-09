import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class GetCallInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ obj }) => obj.includeTranscript == 'true')
  includeTranscript?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ obj }) => obj.includeSummary == 'true')
  includeSummary?: boolean;
}

@Exclude()
class TranscriptResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  content: string;
}

@Exclude()
class SummaryResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  content: string;
}

@Exclude()
export class CallResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;

  @ApiProperty()
  @Expose()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: () => TranscriptResponseDto, required: false })
  @ValidateNested()
  @Type(() => TranscriptResponseDto)
  @Expose()
  transcript?: TranscriptResponseDto;

  @ApiProperty({ type: () => SummaryResponseDto, required: false })
  @ValidateNested()
  @Type(() => SummaryResponseDto)
  @Expose()
  summary?: SummaryResponseDto;
}
