import { AppRpcException } from '@bc-arch-drafter/lib';
import { User, UserService } from '@bc-arch-drafter/model';
import { UsersRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersServiceImpl implements UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUserById(id: User['id']) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new AppRpcException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
