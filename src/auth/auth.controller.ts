import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body);
  }

  @Post()
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }
}
