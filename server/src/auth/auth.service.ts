import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';

export interface UserResponse {
  user: User,
  token: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(userDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.validateUser(userDto);
    const { token } = await this.generateToken(user);
    return { user, token };
  }

  async registration(userDto: CreateUserDto): Promise<UserResponse> {
    const candidate = await this.userService.getUser(userDto.login, userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email или логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const { token } = await this.generateToken(user);
    return { user, token };
  }

  async auth(req) {
    const { id: userId } = req.user

    const user = await this.userService.getUserById(userId);

    const { token } = await this.generateToken(user);
    return { user, token };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUser(userDto.login);

      const passwordEquals = await bcrypt.compare(
        userDto?.password,
        user?.password,
      );

      if (user && passwordEquals) {
        return user;
      }

      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }
  }
}
