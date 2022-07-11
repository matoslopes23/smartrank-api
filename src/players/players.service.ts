import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidV4 } from 'uuid';
// py6lGRQjigHZnpzi mongodb+srv://admin:<py6lGRQjigHZnpzi>@cluster0.bmlpl.mongodb.net/?retryWrites=true&w=majority
@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);
  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerExist = this.players.find((player) => player.email === email);

    if (playerExist) {
      this.update(playerExist, createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  async consultAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    const playerExist = this.players.find((player) => player.email === email);

    if (!playerExist) {
      throw new NotFoundException(
        `jogador com o e-mail ${email} não encontrado`,
      );
    }
    return playerExist;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerExist = this.players.find((player) => player.email === email);
    this.players = this.players.filter(
      (player) => player.email !== playerExist.email,
    );
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      _id: uuidV4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlImagePlayer: 'www.google.com.br/fot123.jpg',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(playerExist: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    playerExist.name = name;
  }
}
