import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/core/auth/auth.dto';
import { AuthService } from 'src/core/auth/auth.service';
import { CreateUserDto } from 'src/core/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
