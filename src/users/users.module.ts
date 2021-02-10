import { Module } from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //** UsersServiceで使うことができる */
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],

  controllers: [UsersController],

  providers: [UsersService],

  //** providersのにあるクラス、またはimportsしたクラスしかexportsできない */
  exports: [UsersService],
})
export class UsersModule {}
