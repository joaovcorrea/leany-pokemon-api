/**
 * SERVIÇO DA POKÉAPI — único lugar que fala com o site externo
 *
 * Centraliza todas as chamadas HTTP para https://pokeapi.co
 * Se o Pokémon não existir lá, devolve erro 404 para a nossa API.
 */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  PokeApiPokemonResponse,
  PokemonDetails,
} from './interfaces/pokemon-details.interface';

@Injectable()
export class PokeApiService {
  private readonly logger = new Logger(PokeApiService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('POKEAPI_BASE_URL') ??
      'https://pokeapi.co/api/v2';
  }

  async getPokemonDetails(
    pokemonIdOuNome: string | number,
  ): Promise<PokemonDetails> {
    const identifier = String(pokemonIdOuNome).trim().toLowerCase();

    try {
      const response = await firstValueFrom(
        this.httpService.get<PokeApiPokemonResponse>(
          `${this.baseUrl}/pokemon/${identifier}`,
        ),
      );

      return this.mapToPokemonDetails(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(
            `Pokémon "${pokemonIdOuNome}" não encontrado na PokéAPI.`,
          );
        }

        this.logger.error(
          `Erro ao consultar PokéAPI para "${pokemonIdOuNome}": ${error.message}`,
        );
        throw new ServiceUnavailableException(
          'Não foi possível consultar a PokéAPI no momento.',
        );
      }

      throw error;
    }
  }

  async pokemonExists(pokemonIdOuNome: string | number): Promise<boolean> {
    await this.getPokemonDetails(pokemonIdOuNome);
    return true;
  }

  private mapToPokemonDetails(data: PokeApiPokemonResponse): PokemonDetails {
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((typeSlot) => typeSlot.type.name),
      sprite: data.sprites.front_default,
      abilities: data.abilities.map((abilitySlot) => abilitySlot.ability.name),
    };
  }
}
