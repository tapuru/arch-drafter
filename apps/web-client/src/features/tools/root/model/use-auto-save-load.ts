import type { ProjectId } from '@bc-arch-drafter/model';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { PROJECTS_ACTIONS } from '@bc-arch-drafter/model';

import { projectsApi } from '@/shared/api';

import { useLoadShapes } from './use-load-shapes';

export const useAutoSaveLoad = () => {
  const { projectId } = useParams();

  const { data, isSuccess } = useQuery({
    queryKey: [PROJECTS_ACTIONS.GET_BY_ID, projectId],
    queryFn: () => projectsApi.getProjectById({ id: projectId as ProjectId }),
  });

  const { handleClearAll, handleLoad } = useLoadShapes();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isSuccess && data.data.canvasJson) {
      //TODO: types
      handleLoad(data.data.canvasJson as any);
    }
    return () => {
      handleClearAll();
    };
  }, [data, isSuccess]);
};
