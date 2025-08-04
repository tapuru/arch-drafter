import { CanvasJson, ProjectId, ProjectName } from '@bc-arch-drafter/model';
import { customType } from 'drizzle-orm/pg-core';

export const ctProjectId = customType<{ data: ProjectId }>({
  dataType: () => 'uuid',
  fromDriver: (val) => val as ProjectId,
});

export const ctProjectName = customType<{ data: ProjectName }>({
  dataType: () => 'varchar',
  fromDriver: (val) => val as ProjectName,
});

export const ctCanvasJson = customType<{ data: CanvasJson }>({
  dataType: () => 'jsonb',
  fromDriver: (val) => val as CanvasJson,
});
