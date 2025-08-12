import { ProjectIdSchema, ProjectNameSchema, ProjectSchema } from '../project.schema';

describe('ProjectSchema', () => {
  it('should have a valid id', () => {
    expect(() => ProjectIdSchema.parse('random string')).toThrow();
    expect(() => ProjectIdSchema.parse(1)).toThrow();
    expect(() => ProjectIdSchema.parse({})).toThrow();
    expect(() => ProjectIdSchema.parse('7af7cc78-4c5c-442c-895f-3fa30791a8ab')).not.toThrow();
  });

  it('should have a valid name', () => {
    expect(() => ProjectNameSchema.parse({})).toThrow('Project name must be a string');
    expect(() => ProjectNameSchema.parse('a')).toThrow('Project name must be least 3 characters long');
    expect(() => ProjectNameSchema.parse('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toThrow(
      'Project name must be shorter than 30 characters',
    );
    expect(() => ProjectNameSchema.parse('valid name')).not.toThrow();
  });

  it('should match a valid project shape', () => {
    const project = {
      id: '7af7cc78-4c5c-442c-895f-3fa30791a8ab',
      name: 'test name',
      ownerId: '7af7cc78-4c5c-442c-895f-3fa30791a8ab',
      canvasJson: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };

    expect(() => ProjectSchema.parse(project)).not.toThrow();
  });
});
