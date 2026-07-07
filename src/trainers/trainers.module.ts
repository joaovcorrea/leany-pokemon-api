import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../entities/trainer.entity';
import { TrainersController } from './trainers.controller';
import { TrainersRepository } from './trainers.repository';
import { TrainersService } from './trainers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainersController],
  providers: [TrainersService, TrainersRepository],
  exports: [TrainersService],
})
export class TrainersModule {}
