import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  async consultPlayers(
    @Query('email') email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.findPlayerByEmail(email);
    } else {
      return await this.playersService.consultAllPlayers();
    }
  }

  @Delete()
  async deletePlayser(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}
