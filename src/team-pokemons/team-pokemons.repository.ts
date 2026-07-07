import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamPokemon } from '../entities/team-pokemon.entity';

@Injectable()
export class TeamPokemonsRepository {
  constructor(
    @InjectRepository(TeamPokemon)
    private readonly repository: Repository<TeamPokemon>,
  ) {}

  create(data: Partial<TeamPokemon>): TeamPokemon {
    return this.repository.create(data);
  }

  save(teamPokemon: TeamPokemon): Promise<TeamPokemon> {
    return this.repository.save(teamPokemon);
  }

  findAllByTeam(timeId: string): Promise<TeamPokemon[]> {
    return this.repository.find({
      where: { timeId },
      order: { pokemonIdOuNome: 'ASC' },
    });
  }

  findById(id: string): Promise<TeamPokemon | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByTeamAndIdentifier(
    timeId: string,
    pokemonIdOuNome: string,
  ): Promise<TeamPokemon | null> {
    return this.repository.findOne({
      where: { timeId, pokemonIdOuNome },
    });
  }

  countByTeam(timeId: string): Promise<number> {
    return this.repository.count({ where: { timeId } });
  }

  async remove(teamPokemon: TeamPokemon): Promise<void> {
    await this.repository.remove(teamPokemon);
  }
}
