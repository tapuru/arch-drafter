import { AppRpcException } from '@bc-arch-drafter/lib';
import { User, UserService } from '@bc-arch-drafter/model';
import { UsersRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UsersServiceImpl implements UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUserById(id: User['id']) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new AppRpcException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async updateUserById(id: User['id'], data: Parameters<UserService['updateUserById']>[1]) {
    const password = data.password ? await argon2.hash(data.password) : undefined;
    const user = await this.userRepository.updateUser(id, { ...data, password });
    if (!user) throw new AppRpcException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async deleteUserById(id: User['id']) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new AppRpcException('User not found', HttpStatus.NOT_FOUND);

    await this.userRepository.deleteUser(id);
  }
}
