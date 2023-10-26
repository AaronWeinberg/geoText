import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

declare const __dirname: string;

export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log(
    '[client]\n',
    `command: ${command}\n`,
    `mode: ${mode}\n`,
    'ssrBuild:',
    ssrBuild
  );

  return {
    root: `${__dirname}/src`,
    publicDir: `${__dirname}/static`,
    clearScreen: false,

    resolve: {
      conditions: ['vite-x'],
    },
    build: {
      target: 'esnext',
      outDir: `${__dirname}/dist`,
    },
    plugins: [solidPlugin()],
    server: {
      port: 9081,
      strictPort: true,
      open: false,
    },
  };
});
