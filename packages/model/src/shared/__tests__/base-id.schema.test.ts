import { BaseIdSchema } from '../schemas/base-id.schema';

describe('BaseIdSchema', () => {
  it('should pass valid uuid', () => {
    expect(() => BaseIdSchema.parse('7af7cc78-4c5c-442c-895f-3fa30791a8ab')).not.toThrow();
  });
  it('should reject invalid uuid', () => {
    expect(() => BaseIdSchema.parse('invalid uuid')).toThrow('Id must be a valid uuid string');
  });
});
