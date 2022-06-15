import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createBrotliDecompress } from 'zlib';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const roles = await this.roleRepository.findAll();
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
