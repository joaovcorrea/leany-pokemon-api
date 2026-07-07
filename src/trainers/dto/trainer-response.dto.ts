import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trainer } from '../../entities/trainer.entity';

export class TrainerResponseDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Ash Ketchum' })
  nome: string;

  @ApiPropertyOptional({ example: 'Pallet Town', nullable: true })
  cidadeOrigem: string | null;

  static fromEntity(trainer: Trainer): TrainerResponseDto {
    return {
      id: trainer.id,
      nome: trainer.nome,
      cidadeOrigem: trainer.cidadeOrigem,
    };
  }
}
