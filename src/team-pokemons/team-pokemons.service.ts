import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PokeApiService } from '../poke-api/poke-api.service';
import { TeamsService } from '../teams/teams.service';
import { AddTeamPokemonDto } from './dto/add-team-pokemon.dto';
import { TeamPokemonResponseDto } from './dto/team-pokemon-response.dto';
import { TeamPokemonsRepository } from './team-pokemons.repository';

const MAX_POKEMONS_PER_TEAM = 6;

@Injectable()
export class TeamPokemonsService {
  constructor(
    private readonly teamPokemonsRepository: TeamPokemonsRepository,
    private readonly teamsService: TeamsService,
    private readonly pokeApiService: PokeApiService,
  ) {}

  async addPokemon(
    teamId: string,
    addTeamPokemonDto: AddTeamPokemonDto,
  ): Promise<TeamPokemonResponseDto> {
    await this.teamsService.findTeamOrFail(teamId);

    const pokemonDetails = await this.pokeApiService.getPokemonDetails(
      addTeamPokemonDto.pokemonIdOuNome,
    );

    const normalizedIdentifier = String(pokemonDetails.id);

    const pokemonCount = await this.teamPokemonsRepository.countByTeam(teamId);
    if (pokemonCount >= MAX_POKEMONS_PER_TEAM) {
      throw new BadRequestException(
        `Um time pode ter no máximo ${MAX_POKEMONS_PER_TEAM} Pokémon.`,
      );
    }

    const existingPokemon =
      await this.teamPokemonsRepository.findByTeamAndIdentifier(
        teamId,
        normalizedIdentifier,
      );

    if (existingPokemon) {
      throw new ConflictException(
        `O Pokémon "${pokemonDetails.name}" já está neste time.`,
      );
    }

    const teamPokemon = this.teamPokemonsRepository.create({
      timeId: teamId,
      pokemonIdOuNome: normalizedIdentifier,
    });

    const savedTeamPokemon =
      await this.teamPokemonsRepository.save(teamPokemon);

    return this.buildResponseDto(savedTeamPokemon, pokemonDetails);
  }

  async findAllByTeam(teamId: string): Promise<TeamPokemonResponseDto[]> {
    await this.teamsService.findTeamOrFail(teamId);

    const teamPokemons =
      await this.teamPokemonsRepository.findAllByTeam(teamId);

    return Promise.all(
      teamPokemons.map(async (teamPokemon) => {
        const pokemonDetails = await this.pokeApiService.getPokemonDetails(
          teamPokemon.pokemonIdOuNome,
        );
        return this.buildResponseDto(teamPokemon, pokemonDetails);
      }),
    );
  }

  async removePokemon(teamId: string, teamPokemonId: string): Promise<void> {
    await this.teamsService.findTeamOrFail(teamId);

    const teamPokemon = await this.teamPokemonsRepository.findById(teamPokemonId);

    if (!teamPokemon || teamPokemon.timeId !== teamId) {
      throw new NotFoundException(
        `Pokémon com id "${teamPokemonId}" não encontrado neste time.`,
      );
    }

    await this.teamPokemonsRepository.remove(teamPokemon);
  }

  private buildResponseDto(
    teamPokemon: { id: string; timeId: string; pokemonIdOuNome: string },
    pokemonDetails: {
      id: number;
      name: string;
      types: string[];
      sprite: string | null;
      abilities: string[];
    },
  ): TeamPokemonResponseDto {
    return {
      id: teamPokemon.id,
      timeId: teamPokemon.timeId,
      pokemonIdOuNome: teamPokemon.pokemonIdOuNome,
      pokemonId: pokemonDetails.id,
      name: pokemonDetails.name,
      types: pokemonDetails.types,
      sprite: pokemonDetails.sprite,
      abilities: pokemonDetails.abilities,
    };
  }
}
