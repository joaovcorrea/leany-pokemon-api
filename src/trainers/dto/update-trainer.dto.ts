import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTrainerDto {
  @ApiPropertyOptional({ example: 'Ash Ketchum' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @ApiPropertyOptional({ example: 'Pallet Town' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cidadeOrigem?: string;
}
