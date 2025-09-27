import { Connections } from '@bc-arch-drafter/api-config';
import { TokenType, TokenUuid, UserId, Token } from '@bc-arch-drafter/model';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import type { Database } from '@/shared';

import { tokens } from './token.schema';

@Injectable()
export class TokensRepository {
  constructor(@Inject(Connections.POSTGRES) private readonly db: Database) {}

  public async saveToken(data: Omit<Token, 'id' | 'isRevoked'>) {
    await this.db.insert(tokens).values(data);
  }

  public async findByUuid(tokenUuid: TokenUuid) {
    return this.db.query.tokens.findFirst({ where: eq(tokens.tokenUuid, tokenUuid) });
  }

  public async findByUserIdAndTokenType(userId: UserId, tokenType: TokenType) {
    return this.db.query.tokens.findFirst({ where: and(eq(tokens.userId, userId), eq(tokens.type, tokenType)) });
  }

  public async revokeToken(tokenUuid: TokenUuid) {
    await this.db.update(tokens).set({ isRevoked: true }).where(eq(tokens.tokenUuid, tokenUuid));
  }

  public async deleteToken(tokenUuid: TokenUuid) {
    await this.db.delete(tokens).where(eq(tokens.tokenUuid, tokenUuid));
  }
}
