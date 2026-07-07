import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddTeamPokemonDto } from './dto/add-team-pokemon.dto';
import { TeamPokemonResponseDto } from './dto/team-pokemon-response.dto';
import { TeamPokemonsService } from './team-pokemons.service';

@ApiTags('Pokémon dos Times')
@Controller('teams/:teamId/pokemons')
export class TeamPokemonsController {
  constructor(private readonly teamPokemonsService: TeamPokemonsService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um Pokémon a um time' })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  addPokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() addTeamPokemonDto: AddTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    return this.teamPokemonsService.addPokemon(teamId, addTeamPokemonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar os Pokémon de um time com detalhes da PokéAPI',
  })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  findAll(
    @Param('teamId', ParseUUIDPipe) teamId: string,
  ): Promise<TeamPokemonResponseDto[]> {
    return this.teamPokemonsService.findAllByTeam(teamId);
  }

  @Delete(':teamPokemonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um Pokémon de um time' })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  @ApiParam({ name: 'teamPokemonId', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Pokémon removido do time com sucesso' })
  removePokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param('teamPokemonId', ParseUUIDPipe) teamPokemonId: string,
  ): Promise<void> {
    return this.teamPokemonsService.removePokemon(teamId, teamPokemonId);
  }
}
