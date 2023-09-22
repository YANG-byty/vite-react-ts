module.exports = {
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'plugin:vue/essential',  vue2的规则
    // 在 node_modules/eslint-plugin-vue/lib/configs 文件夹下
    'plugin:vue/vue3-strongly-recommended', // vue3
    // 'standard',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: [1, 'always'], // 强制结尾有分号
    indent: [1, 2], // 强制使用2空格缩进
    quotes: [1, 'single'], // 强制使用单引号
    'no-multiple-empty-lines': [2, { max: 2 }], //空行最多不能超过两行
    eqeqeq: [0], //比较的时候不使用严格等于
    'no-invalid-regexp': [0], //不效验正则
    'no-useless-escape': [0], //禁用不必要的转义
    'spaced-comment': [0], //注释首尾留空格 关闭
    'handle-callback-err': [0], //回调里不处理错误
    'space-before-function-paren': [0], //函数定义时括号前的空格
    'no-console': [0], //process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': [0],
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
      },
    ],
  },
}
