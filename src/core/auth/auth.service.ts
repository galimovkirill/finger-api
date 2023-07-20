import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/core/auth/auth.dto';
import { UsersService } from 'src/core/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/core/users/users.model';
import { CreateUserDto } from 'src/core/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.loginValidation(loginUserDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new BadRequestException('User with given email already exist');
    }

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(createUserDto.password, salt);

    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = await this.generateToken(user);
    return token;
  }

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async loginValidation(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isValidPassword = await bcryptjs.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return user;
  }
}
