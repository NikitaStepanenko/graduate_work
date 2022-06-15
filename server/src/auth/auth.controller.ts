import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService, UserResponse } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.registration(userDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  auth(@Request() req) {
    return this.authService.auth(req);
  }
}
