import { Connections } from '@bc-arch-drafter/api-config';
import { LoginRequestDto, RegistrationRequestDto } from '@bc-arch-drafter/model';
import { NodePgDatabase, userSchema } from '@bc-arch-drafter/postgres-db';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject(Connections.POSTGRES) private readonly db: NodePgDatabase<typeof userSchema>) {}

  register(dto: RegistrationRequestDto): string {
    const { email, password } = dto;
    return `email: ${email} password:${password}`;
  }

  login(dto: LoginRequestDto): string {
    const { email, password } = dto;
    return `email: ${email} password:${password}`;
  }

  async me() {
    const allUsers = await this.db.query.users.findMany();
    return allUsers;
  }
}
