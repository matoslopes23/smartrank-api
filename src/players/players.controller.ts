import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    return await this.playersService.createPlayer(createPlayerDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateRouterPlayer(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDTO);
  }

  @Get()
  async consultPlayers(): Promise<Player[]> {
    return await this.playersService.consultAllPlayers();
  }

  @Get('/:_id')
  async findPlayerById(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<Player> {
    return await this.playersService.findPlayerById(_id);
  }

  @Delete('/_id')
  async deletePlayser(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<void> {
    this.playersService.deletePlayer(_id);
  }
}
