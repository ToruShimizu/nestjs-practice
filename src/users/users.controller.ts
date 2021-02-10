import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(AuthGuard('jwt'))

  // ** @Paramでusernameを受け取る*/
  findOne(@Param('username') username: string, @Request() req: any) {
    // ** トークンを持ったユーザー */
    return req.user;
  }

  @Post()
  //** bodyの値がCreateUserDtoのルールと合っているかチェックする */
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.usersService.delete(username);
  }

  @Put(':username')
  update(@Param('username') username: string) {
    return this.usersService.update(username);
  }
}
