import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
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

  async signIn(body: SignInDto) {
    const userExist = await this.prisma.user.findMany({
      where: { email: body.email },
    });

    const passwordIsCorrect = await compare(
      body.password,
      userExist?.[0]?.password,
    );

    if (userExist.length < 1 && !passwordIsCorrect)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = {
      userId: userExist?.[0]?.id,
      email: userExist?.[0]?.email,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
