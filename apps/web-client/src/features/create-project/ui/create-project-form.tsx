import { MOCK_USER_ID } from '@/shared/mocks';
import { projectsApi } from '@bc-arch-drafter/client-services';
import { Button, Input } from '@bc-arch-drafter/ui';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const CreateProjectForm = () => {
  const { mutateAsync } = useMutation({ mutationFn: projectsApi.createProject });
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const project = await mutateAsync({ name, ownerId: MOCK_USER_ID });
    navigate(`/projects/${project.data.id}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Project name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="my new project"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button className="w-full">Create</Button>
      </form>
    </div>
  );
};
