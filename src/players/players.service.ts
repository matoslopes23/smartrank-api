import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    // const playerExist = this.players.find((player) => player.email === email);
    const playerExist = await this.playerModel.findOne({ email }).exec();

    if (playerExist) {
      this.update(createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  async consultAllPlayers(): Promise<Player[]> {
    // return await this.players;
    return await this.playerModel.find().exec();
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    const playerExist = await this.playerModel.findOne({ email }).exec();

    if (!playerExist) {
      throw new NotFoundException(
        `jogador com o e-mail ${email} não encontrado`,
      );
    }
    return playerExist;
  }

  async deletePlayer(email: string): Promise<any> {
    // const playerExist = this.players.find((player) => player.email === email);
    // this.players = this.players.filter(
    //   (player) => player.email !== playerExist.email,
    // );
    return await this.playerModel.remove({ email }).exec();
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const playerCreate = new this.playerModel(createPlayerDTO);

    return await playerCreate.save();
    /*
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlImagePlayer: 'www.google.com.br/fot123.jpg',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);**/
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();
    // const { name } = createPlayerDTO;
    // playerExist.name = name;
  }
}
