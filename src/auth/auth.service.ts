import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async validateUser({ username, password }: CreateUserDto) {
    const user = this.usersService.findOne(username);
    return true;
  }
  async login(user: CreateUserDto) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
