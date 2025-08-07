// @ts-ignore
import { Options } from 'tsup';

import { baseTsupConfig } from '../../tsup.base';
import pkg from './package.json';


export default baseTsupConfig({
  entry: ['src/index.ts'],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
    'tailwind-merge',
    'clsx',
    'lucide-react',
    'scheduler',
    /^@radix-ui\//,
    /^@babel\/runtime/
  ],
  esbuildOptions(options: Options) {
    options.loader = {
      ...options.loader,
      '.css': 'text',
    };
  },
  async onSuccess() {
    const { copyFileSync, mkdirSync } = await import('node:fs');
    mkdirSync('build/styles', { recursive: true });
    copyFileSync('src/styles/global.css', 'build/styles/global.css');
  },
});
