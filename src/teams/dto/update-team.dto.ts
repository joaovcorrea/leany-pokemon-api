import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTeamDto {
  @ApiPropertyOptional({ example: 'Time Elétrico' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nomeDoTime?: string;
}
