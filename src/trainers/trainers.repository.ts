import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from '../entities/trainer.entity';

@Injectable()
export class TrainersRepository {
  constructor(
    @InjectRepository(Trainer)
    private readonly repository: Repository<Trainer>,
  ) {}

  create(data: Partial<Trainer>): Trainer {
    return this.repository.create(data);
  }

  save(trainer: Trainer): Promise<Trainer> {
    return this.repository.save(trainer);
  }

  findAll(): Promise<Trainer[]> {
    return this.repository.find({ order: { nome: 'ASC' } });
  }

  findById(id: string): Promise<Trainer | null> {
    return this.repository.findOne({ where: { id } });
  }

  async remove(trainer: Trainer): Promise<void> {
    await this.repository.remove(trainer);
  }
}
