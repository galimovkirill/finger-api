import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/core/users/users.dto';
import { User } from 'src/core/users/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async deleteUserById(id: number) {
    await this.userRepository.destroy({ where: { id } });
    return true;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
