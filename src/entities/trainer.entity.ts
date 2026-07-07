/**
 * ENTIDADE = tabela do banco de dados
 *
 * Esta classe vira a tabela "trainers" no PostgreSQL.
 * NÃO é retornada diretamente na API — usamos DTOs para isso.
 */
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cidadeOrigem: string | null;

  @OneToMany(() => Team, (team) => team.treinador)
  times: Team[];
}
