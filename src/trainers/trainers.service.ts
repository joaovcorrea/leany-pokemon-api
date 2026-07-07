/**
 * SERVICE DE TREINADORES — o "cozinheiro"
 *
 * Contém a lógica de negócio: criar, buscar, atualizar, apagar.
 * Chama o Repository para falar com o banco.
 * Converte Entity → DTO antes de devolver (nunca expõe a entidade crua).
 */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainersRepository } from './trainers.repository';

@Injectable()
export class TrainersService {
  constructor(private readonly trainersRepository: TrainersRepository) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<TrainerResponseDto> {
    const trainer = this.trainersRepository.create({
      nome: createTrainerDto.nome,
      cidadeOrigem: createTrainerDto.cidadeOrigem ?? null,
    });

    const savedTrainer = await this.trainersRepository.save(trainer);
    return TrainerResponseDto.fromEntity(savedTrainer);
  }

  async findAll(): Promise<TrainerResponseDto[]> {
    const trainers = await this.trainersRepository.findAll();
    return trainers.map(TrainerResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<TrainerResponseDto> {
    const trainer = await this.findTrainerOrFail(id);
    return TrainerResponseDto.fromEntity(trainer);
  }

  async update(
    id: string,
    updateTrainerDto: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    const trainer = await this.findTrainerOrFail(id);

    if (updateTrainerDto.nome !== undefined) {
      trainer.nome = updateTrainerDto.nome;
    }

    if (updateTrainerDto.cidadeOrigem !== undefined) {
      trainer.cidadeOrigem = updateTrainerDto.cidadeOrigem;
    }

    const updatedTrainer = await this.trainersRepository.save(trainer);
    return TrainerResponseDto.fromEntity(updatedTrainer);
  }

  async remove(id: string): Promise<void> {
    const trainer = await this.findTrainerOrFail(id);
    await this.trainersRepository.remove(trainer);
  }

  async findTrainerOrFail(id: string) {
    const trainer = await this.trainersRepository.findById(id);

    if (!trainer) {
      throw new NotFoundException(`Treinador com id "${id}" não encontrado.`);
    }

    return trainer;
  }
}
