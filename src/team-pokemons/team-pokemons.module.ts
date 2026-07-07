import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from '../entities/team-pokemon.entity';
import { PokeApiModule } from '../poke-api/poke-api.module';
import { TeamsModule } from '../teams/teams.module';
import { TeamPokemonsController } from './team-pokemons.controller';
import { TeamPokemonsRepository } from './team-pokemons.repository';
import { TeamPokemonsService } from './team-pokemons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamPokemon]),
    TeamsModule,
    PokeApiModule,
  ],
  controllers: [TeamPokemonsController],
  providers: [TeamPokemonsService, TeamPokemonsRepository],
})
export class TeamPokemonsModule {}
