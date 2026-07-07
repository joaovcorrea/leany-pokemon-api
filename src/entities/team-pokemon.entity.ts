import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('team_pokemons')
export class TeamPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  timeId: string;

  @Column({ type: 'varchar', length: 100 })
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, (team) => team.pokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'timeId' })
  time: Team;
}
