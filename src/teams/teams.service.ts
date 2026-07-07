import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrainersService } from '../trainers/trainers.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsRepository } from './teams.repository';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly trainersService: TrainersService,
  ) {}

  async create(
    treinadorId: string,
    createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
    await this.trainersService.findTrainerOrFail(treinadorId);

    const team = this.teamsRepository.create({
      nomeDoTime: createTeamDto.nomeDoTime,
      treinadorId,
    });

    const savedTeam = await this.teamsRepository.save(team);
    return TeamResponseDto.fromEntity(savedTeam);
  }

  async findAllByTrainer(treinadorId: string): Promise<TeamResponseDto[]> {
    await this.trainersService.findTrainerOrFail(treinadorId);

    const teams = await this.teamsRepository.findAllByTrainer(treinadorId);
    return teams.map(TeamResponseDto.fromEntity);
  }

  async findOne(teamId: string): Promise<TeamResponseDto> {
    const team = await this.findTeamOrFail(teamId);
    return TeamResponseDto.fromEntity(team);
  }

  async update(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    const team = await this.findTeamOrFail(teamId);

    if (updateTeamDto.nomeDoTime !== undefined) {
      team.nomeDoTime = updateTeamDto.nomeDoTime;
    }

    const updatedTeam = await this.teamsRepository.save(team);
    return TeamResponseDto.fromEntity(updatedTeam);
  }

  async remove(teamId: string): Promise<void> {
    const team = await this.findTeamOrFail(teamId);
    await this.teamsRepository.remove(team);
  }

  async findTeamOrFail(teamId: string) {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new NotFoundException(`Time com id "${teamId}" não encontrado.`);
    }

    return team;
  }
}
