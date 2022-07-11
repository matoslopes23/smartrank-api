import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:py6lGRQjigHZnpzi@cluster0.bmlpl.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
        // // useFindAndModify: false,
      },
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
