import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamPokemonResponseDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  timeId: string;

  @ApiProperty({ example: 'pikachu' })
  pokemonIdOuNome: string;

  @ApiProperty({ example: 25 })
  pokemonId: number;

  @ApiProperty({ example: 'pikachu' })
  name: string;

  @ApiProperty({ example: ['electric'], type: [String] })
  types: string[];

  @ApiPropertyOptional({
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    nullable: true,
  })
  sprite: string | null;

  @ApiProperty({ example: ['static', 'lightning-rod'], type: [String] })
  abilities: string[];
}
