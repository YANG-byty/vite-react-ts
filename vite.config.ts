import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'
const Timestamp = new Date().getTime()

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      react(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    // 静态资源基础路径 base: './' || '',
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
    resolve: {
      alias: [
        //配置别名
        { find: '@', replacement: resolve(__dirname, './src') },
      ],
    },
    build: {
      // 压缩
      minify: 'terser',
      outDir: `./dist`,
      // 进行压缩计算
      // brotliSize: false,
      /** 消除打包大小超过 500kb 警告 */
      // chunkSizeWarningLimit: 2000,

      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        output: {
          /** 删除注释 */
          comments: false,
        },
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static',

      rollupOptions: {
        output: {
          //静态资源分类打包      加上时间戳防止缓存
          chunkFileNames: `static/js/[name]-[hash]-${Timestamp}.js`,
          entryFileNames: `static/js/[name]-[hash]-${Timestamp}.js`,
          assetFileNames: `static/[ext]/[name]-[hash]-${Timestamp}.[ext]`,
          manualChunks(id) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9039,
    },
  })
