/**
 * CONTROLLER DE TREINADORES — o "garçom"
 *
 * Só recebe requisições HTTP e repassa para o TrainersService.
 * Não acessa banco diretamente.
 *
 * Rotas: POST/GET/PATCH/DELETE em /trainers
 */
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
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainerResponseDto } from './dto/trainer-response.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainersService } from './trainers.service';

@ApiTags('Treinadores')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um treinador' })
  create(@Body() createTrainerDto: CreateTrainerDto): Promise<TrainerResponseDto> {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os treinadores' })
  findAll(): Promise<TrainerResponseDto[]> {
    return this.trainersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um treinador por id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrainerResponseDto> {
    return this.trainersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um treinador' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ): Promise<TrainerResponseDto> {
    return this.trainersService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um treinador' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Treinador removido com sucesso' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trainersService.remove(id);
  }
}
