import { baseTsupConfig } from '../../tsup.base';

export default baseTsupConfig({
  entry: ['src/index.ts'],
  external: [
    'react',
    'scheduler',
    'react-dom',
    'tailwind-merge',
    'clsx',
    'lucide-react',
    'scheduler',
    /^@radix-ui\//,
    /^@babel\/runtime/,
  ],
});
