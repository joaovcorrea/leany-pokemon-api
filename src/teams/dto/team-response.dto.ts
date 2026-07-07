import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../entities/team.entity';

export class TeamResponseDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Time Elétrico' })
  nomeDoTime: string;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  treinadorId: string;

  static fromEntity(team: Team): TeamResponseDto {
    return {
      id: team.id,
      nomeDoTime: team.nomeDoTime,
      treinadorId: team.treinadorId,
    };
  }
}
