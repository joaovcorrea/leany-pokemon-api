import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@ApiTags('Times')
@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('trainers/:trainerId/teams')
  @ApiOperation({ summary: 'Criar um time para um treinador' })
  @ApiParam({ name: 'trainerId', type: 'string', format: 'uuid' })
  create(
    @Param('trainerId', ParseUUIDPipe) trainerId: string,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.create(trainerId, createTeamDto);
  }

  @Get('trainers/:trainerId/teams')
  @ApiOperation({ summary: 'Listar todos os times de um treinador' })
  @ApiParam({ name: 'trainerId', type: 'string', format: 'uuid' })
  findAllByTrainer(
    @Param('trainerId', ParseUUIDPipe) trainerId: string,
  ): Promise<TeamResponseDto[]> {
    return this.teamsService.findAllByTrainer(trainerId);
  }

  @Get('teams/:teamId')
  @ApiOperation({ summary: 'Buscar um time por id' })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  findOne(@Param('teamId', ParseUUIDPipe) teamId: string): Promise<TeamResponseDto> {
    return this.teamsService.findOne(teamId);
  }

  @Patch('teams/:teamId')
  @ApiOperation({ summary: 'Atualizar um time' })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  update(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.update(teamId, updateTeamDto);
  }

  @Delete('teams/:teamId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um time' })
  @ApiParam({ name: 'teamId', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Time removido com sucesso' })
  remove(@Param('teamId', ParseUUIDPipe) teamId: string): Promise<void> {
    return this.teamsService.remove(teamId);
  }
}
