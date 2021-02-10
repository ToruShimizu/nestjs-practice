import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    //** mongodbから持ってくる */
    MongooseModule.forRoot(
      'mongodb+srv://trs:tt1234@cluster0.xh4zm.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

new AppModule();

const appService = new AppService();
new AppController(appService);
