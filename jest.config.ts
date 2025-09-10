import { Config } from '@jest/types';

type JestDisplayColor =
  | 'white'
  | 'black'
  | 'yellow'
  | 'cyan'
  | 'magenta'
  | 'blue'
  | 'red'
  | 'green'
  | 'blackBright'
  | 'greenBright'
  | 'redBright';

const project = (path: string, env: 'node' | 'jsdom', color?: JestDisplayColor): Config.InitialProjectOptions => ({
  rootDir: `<rootDir>/${path}`,
  testEnvironment: env,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  displayName: {
    name: path,
    color: color ?? 'white',
  },
  testMatch: ['<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
});

const reactProject = (path: string, color?: JestDisplayColor): Config.InitialProjectOptions => ({
  ...project(path, 'jsdom', color),
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            tsx: true,
            syntax: 'typescript',
          },
          transform: {
            react: {
              runtime: 'automatic',
              development: true,
            },
          },
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
});

const nestProject = (path: string, color?: JestDisplayColor): Config.InitialProjectOptions => ({
  ...project(path, 'node', color),

  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
});

const config: Config.InitialOptions = {
  verbose: true,
  projects: [
    project('packages/model', 'node', 'cyan'),
    project('packages/contracts', 'node', 'cyan'),
    project('packages/client-services', 'node', 'cyan'),

    nestProject('packages/lib', 'cyan'),
    nestProject('packages/postgres-db', 'cyan'),
    nestProject('packages/api-config', 'cyan'),

    reactProject('packages/ui', 'cyan'),

    nestProject('apps/gateway', 'magenta'),
    nestProject('apps/projects-service', 'magenta'),
    nestProject('apps/users-service', 'magenta'),
    nestProject('apps/export-service', 'magenta'),
    // TODO: rename to rooms
    nestProject('apps/sessions-service', 'magenta'),
    nestProject('apps/storage-service', 'magenta'),

    reactProject('apps/web-client', 'magenta'),
    reactProject('apps/landing', 'magenta'),
  ],
};

export default config;
