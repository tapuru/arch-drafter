import { AppRpcException } from '@bc-arch-drafter/lib';
import { AuthService } from '@bc-arch-drafter/model';
import { UsersRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(data: Parameters<AuthService['register']>[0]) {
    const { name, email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (user) throw new AppRpcException('User already exists', HttpStatus.BAD_REQUEST);

    const passwordHash = await argon2.hash(password);
    await this.userRepository.createUser(name, email, passwordHash);

    return { accessToken: 'fake-token-register' };

    // todo generate access token
    // todo send to email - optional
  }

  async login(data: Parameters<AuthService['login']>[0]) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppRpcException('User is not exists', HttpStatus.NOT_FOUND);
    if (user.isBanned) throw new AppRpcException('User is banned', HttpStatus.FORBIDDEN);
    if (!user.isVerified) throw new AppRpcException('Email is not verified', HttpStatus.UNAUTHORIZED);
    if (!(await argon2.verify(user.password, password)))
      throw new AppRpcException('Invalid login or password', HttpStatus.BAD_REQUEST);

    return { accessToken: 'fake-token-login' };
  }
}
