import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signUp(body: SignUpDto) {
    const userExist = await this.prisma.user.findMany({
      where: { email: body.email },
    });

    if (userExist.length > 0)
      throw new UnauthorizedException('Já existe um usuário com esse email');

    const passwordHashed = await hash(body.password, 10);

    return await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHashed,
      },
      omit: {
        password: true,
      },
    });
  }

  signIn(body: SignInDto) {
    console.log(body);
  }
}
