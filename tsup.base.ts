import { Options } from 'tsup';

export const baseTsupConfig = (options: Options): Options => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  outDir: 'build',
  target: 'node18',
  watch: options.watch,
});
