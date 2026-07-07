import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trainer } from './trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nomeDoTime: string;

  @Column({ type: 'uuid' })
  treinadorId: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.times, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'treinadorId' })
  treinador: Trainer;

  @OneToMany(() => TeamPokemon, (teamPokemon) => teamPokemon.time)
  pokemons: TeamPokemon[];
}
