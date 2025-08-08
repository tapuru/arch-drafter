import { baseTsupConfig } from '../../tsup.base';


export default baseTsupConfig({
  entry: ['src/index.ts'],
  external: [
    'tailwind-merge',
    'clsx',
    'lucide-react',
    'scheduler',
    /^@radix-ui\//,
    /^@babel\/runtime/,
  ],
});
