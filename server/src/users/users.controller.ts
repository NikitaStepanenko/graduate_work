import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  // @Post('/ban')
  // ban(@Body() dto: BanUserDto) {
  //   return this.usersService.banUser(dto);
  // }
}
