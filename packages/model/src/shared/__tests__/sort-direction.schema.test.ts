import { SortDirectionSchema } from '../schemas/sort-direction.schema';

describe('SortDirectionSchema', () => {
  it('should pass valid sort direction string', () => {
    expect(() => SortDirectionSchema.parse('ASC')).not.toThrow();
    expect(() => SortDirectionSchema.parse('DESC')).not.toThrow();
  });
  it('should reject invalid sort direction', () => {
    expect(() => SortDirectionSchema.parse('random string')).toThrow();
    expect(() => SortDirectionSchema.parse(1)).toThrow();
    expect(() => SortDirectionSchema.parse({})).toThrow();
  });
});
