import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddTeamPokemonDto {
  @ApiProperty({
    example: 'pikachu',
    description: 'ID numérico ou nome do Pokémon na PokéAPI',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  pokemonIdOuNome: string;
}
