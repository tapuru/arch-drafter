import { IsoDateSchema, NullableIsoDateSchema } from '../schemas/iso-date.schema';

const invalidDates = [
  'not-a-date',
  '2025-99-99T99:99:99Z',
  '2025-02-30T12:00:00Z',
  '2025-04-31T12:00:00Z',

  '2025-08-12',
  '2025/08/12',
  '2025.08.12',

  '2025-08-12T12:34:56',
  '2025-08-12T12:34',

  '2025.08.12T12:34:56Z',
  '2025-08-12 12:34:56Z',

  '2025-08-12 12:34:56',

  '2025-08-12T12:34:56Zabc',

  '2021-02-29T00:00:00Z',
];

describe('IsoDateSchema', () => {
  it('should validate a correct ISO datetime', () => {
    const validDate = '2025-08-12T10:30:00.000Z';
    expect(() => IsoDateSchema.parse(validDate)).not.toThrow();
  });
  it.each(invalidDates)('should reject an invalid ISO datetime: %s', (date) => {
    expect(() => IsoDateSchema.parse(date)).toThrow('Invalid ISO datetime format');
  });
});

describe('NullableIsoDateSchema', () => {
  it('should validate a correct ISO datetime', () => {
    const validDate = '2025-08-12T10:30:00.000Z';
    expect(() => NullableIsoDateSchema.parse(validDate)).not.toThrow();
  });

  it('should allow null', () => {
    expect(() => NullableIsoDateSchema.parse(null)).not.toThrow();
  });

  it.each(invalidDates)('should reject an invalid ISO datetime: %s', (date) => {
    expect(() => IsoDateSchema.parse(date)).toThrow('Invalid ISO datetime format');
  });
});
