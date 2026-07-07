import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectRepository(Team)
    private readonly repository: Repository<Team>,
  ) {}

  create(data: Partial<Team>): Team {
    return this.repository.create(data);
  }

  save(team: Team): Promise<Team> {
    return this.repository.save(team);
  }

  findAllByTrainer(treinadorId: string): Promise<Team[]> {
    return this.repository.find({
      where: { treinadorId },
      order: { nomeDoTime: 'ASC' },
    });
  }

  findById(id: string): Promise<Team | null> {
    return this.repository.findOne({ where: { id } });
  }

  async remove(team: Team): Promise<void> {
    await this.repository.remove(team);
  }
}
