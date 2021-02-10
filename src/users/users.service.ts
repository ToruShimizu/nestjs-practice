import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  //** forFeatureの引数のオブジェクトのプロパティUserを明示的に示している */
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  users: CreateUserDto[] = [];

  //** ユーザー情報取得 */
  async findAll() {
    return await this.userModel.find().exec();
  }

  //** 任意のユーザー情報取得を一件取得 */
  async findOne(username: string) {
    //** デフォルトでpromiseではないためexec()で非同期にする */
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('Could not find user');

    return user;
  }

  //** ユーザー作成 */
  async create(user: CreateUserDto) {
    const createdUser = new this.userModel({
      username: user.username,
      //** ハッシュ化 */
      password: await bcrypt.hash(user.password, 12),
    });
    return await createdUser.save();
  }

  //** ユーザー削除 */
  async delete(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException('Could not find user');

    //** デフォルトでpromiseではないためexec()で非同期にする */
    this.userModel.deleteOne({ username }).exec();
    return user;
  }

  //** ユーザー情報更新 */
  async update(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException('Could not find user');

    user.username = 'tom';
    user.save();
    return user;
  }
}
