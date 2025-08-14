import { MemebershipId } from '@bc-arch-drafter/model';
import { eq } from 'drizzle-orm';

import { MembershipsRepository } from '../memberships.repository';
import { memberships } from '../memberships.schema';

jest.mock('../memberships.schema', () => ({
  memberships: {},
}));

jest.mock('drizzle-orm', () => ({
  eq: jest.fn((...args) => ({ eqMock: args })),
}));

jest.mock('@/shared', () => ({
  buildOrderBy: jest.fn(() => 'orderByExpr'),
}));

const mockDb = {
  query: {
    memberships: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
};

describe('MembershipsRepository', () => {
  let repo: MembershipsRepository;

  beforeEach(() => {
    repo = new MembershipsRepository(mockDb as any);
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should call findFirst with correct where condition and relations', async () => {
      mockDb.query.memberships.findFirst.mockReturnValueOnce({ id: 'test-id' });

      const result = await repo.getById('test-id' as MemebershipId, { relations: { project: true } });

      expect(eq).toHaveBeenCalledWith(memberships.id, 'test-id');

      expect(mockDb.query.memberships.findFirst).toHaveBeenCalledWith({
        where: { eqMock: [memberships.id, 'test-id'] },
        with: { project: true },
      });
      expect(result).toEqual({ id: 'test-id' });
    });
  });
});
