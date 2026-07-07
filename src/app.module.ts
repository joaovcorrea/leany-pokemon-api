/**
 * Aqui conectamos o banco PostgreSQL e importamos cada módulo
 * (treinadores, times, pokemons, pokeapi).
 * Esse arquivo é como o indice da aplicação.
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from './entities/team.entity';
import { Trainer } from './entities/trainer.entity';
import { PokeApiModule } from './poke-api/poke-api.module';
import { TeamPokemonsModule } from './team-pokemons/team-pokemons.module';
import { TeamsModule } from './teams/teams.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'leany_pokemon'),
        entities: [Trainer, Team, TeamPokemon],
        synchronize: true,
      }),
    }),
    TrainersModule,
    TeamsModule,
    TeamPokemonsModule,
    PokeApiModule,
  ],
})
export class AppModule {}
