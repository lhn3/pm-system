module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect' // 或者指定具体版本
    }
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    quotes: ['error', 'single'], // 使用单引号
    '@typescript-eslint/no-explicit-any': ['off'], // 这里不配置的话使用any类型就会报错
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, // 函数参数不能重复
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-eq-null': 2, // 禁止对null使用==或!=运算符
    'no-extra-parens': 0, // 禁止非必要的括号
    'no-extra-semi': 2, // 禁止多余的冒号
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-multi-spaces': 1, // 不能用多余的空格
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-var': 2, // 禁用var，用let和const代替
    'init-declarations': 0, // 声明时必须赋初值
    // 避免 `eslint` 对于 `typescript` 函数重载的误报
    'no-redeclare': 0, // 禁止重复声明变量
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': 'off', // 不能有声明后未被使用的变量或参数
    'react/display-name': 'off',
    'react/prop-types': 'off', // 默认使用react/prop-types检查
    'require-jsdoc': 'off' // 取消注视规范
  }
}
