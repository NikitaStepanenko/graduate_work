import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) { }

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('USER');
    const user = await this.userRepository.create({ ...dto, roleId: role.id });
    user.role = role;
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUser(login: string, email?: string) {
    let user

    if (email) {
      user = await this.userRepository.findOne({
        where: { [Op.or]: [{ email }, { login }] },
        include: { all: true },
      });
    }
    else {
      user = await this.userRepository.findOne({
        where: { login },
        include: { all: true },
      });
    }



    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
      attributes: {
        exclude: ['password']
      }
    });

    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  // async banUser(dto: BanUserDto) {
  //   const user = await this.userRepository.findByPk(dto.userId);
  //   if (!user) {
  //     throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  //   }
  //   user.banned = true;
  //   user.banReason = dto.banReason;

  //   await user.save();
  //   return user;
  // }
}
