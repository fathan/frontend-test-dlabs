import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

function locatePATH (path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      manifest: true,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        input: {
          main: './src/main.ts',
          index: './index.html'
        }
      }
    },
    base: env.VITE_APP_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': locatePATH('./src'),
        '~@': locatePATH('./src'),
        '@assets': locatePATH('./src/assets'),
        '@components': locatePATH('./src/components'),
        '@configurations': locatePATH('./src/configurations'),
        '@interfaces': locatePATH('./src/interfaces'),
        '@language': locatePATH('./src/language'),
        '@libs': locatePATH('./src/libs'),
        '@plugins': locatePATH('./src/plugins'),
        '@router': locatePATH('./src/router'),
        '@services': locatePATH('./src/services'),
        '@stores': locatePATH('./src/stores'),
        '@styles': locatePATH('./src/styles'),
        '@types': locatePATH('./src/types'),
        '@utils': locatePATH('./src/utils')
      }
    },
    plugins: [
      vue(),
      Components({
        include: [
          /\.[t]s?$/, // .ts
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        dts: './src/auto-imports.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/main.scss" as *;'
        }
      }
    },
    server: {
      port: Number(`${ process.env.port }`) || 5000
    }
  };
});