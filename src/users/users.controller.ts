import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
  @Post()
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
