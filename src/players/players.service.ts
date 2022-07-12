import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;

    // const playerExist = this.players.find((player) => player.email === email);
    const playerExist = await this.playerModel.findOne({ email }).exec();

    if (playerExist) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} ja cadastrado`,
      );
    }
    const playerCreate = new this.playerModel(createPlayerDTO);

    return await playerCreate.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<void> {
    const playerExist = await this.playerModel.findOne({ _id }).exec();

    if (!playerExist) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDTO })
      .exec();
  }

  async consultAllPlayers(): Promise<Player[]> {
    // return await this.players;
    return await this.playerModel.find().exec();
  }

  async findPlayerById(_id: string): Promise<Player> {
    const playerExist = await this.playerModel.findOne({ _id }).exec();

    if (!playerExist) {
      throw new NotFoundException(`jogador com o e-mail ${_id} não encontrado`);
    }
    return playerExist;
  }

  async deletePlayer(_id: string): Promise<any> {
    const playerExist = await this.playerModel.findOne({ _id }).exec();

    if (!playerExist) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return await this.playerModel.deleteOne({ _id }).exec();
  }
}
