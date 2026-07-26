import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  signUp(body: SignUpDto) {
    console.log(body);
  }

  signIn(body: SignInDto) {
    console.log(body);
  }
}
