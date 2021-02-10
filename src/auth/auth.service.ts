import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  //** バリデーションチェック */
  async validateUser({ username, password }: CreateUserDto) {
    //** 参照するユーザー */
    const user = await this.usersService.findOne(username);
    //** 平文とハッシュ化されたパスワードを比較 */
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return isValid;
  }

  //** ログイン */
  async login(user: CreateUserDto) {
    if (await this.validateUser(user)) {
      //** ユーザーの情報 */
      const payload = { username: user.username };
      return {
        //** 暗号化されたユーザー情報が返る。jwt.ioで確認できる */
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
