import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { dirname } from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const esm = [
  // ESModules (esm) build
  {
    input: './source/index.ts',
    output: {
      dir: dirname(pkg.module),
      exports: 'named',
      format: 'esm',
      name: 'fsr-esm',
      sourcemap: false
    },
    external: [],
    plugins: [resolve(), typescript({ tsconfig: './tsconfig.build.json' })]
  }
]

const cjs = [
  // CommonJS (cjs) build
  {
    input: './source/index.ts',
    output: {
      dir: dirname(pkg.main),
      exports: 'named',
      format: 'cjs',
      globals: {},
      name: 'fsr-cjs',
      sourcemap: false
    },
    external: [],
    plugins: [
      resolve(),
      commonjs({}),
      typescript({ tsconfig: './tsconfig.build.json' })
    ]
  },

  // Minified cjs build
  {
    input: './source/index.ts',
    output: {
      file: `${dirname(pkg.main)}/${pkg.name}.min.js`,
      exports: 'named',
      format: 'cjs',
      name: 'fsr-cjs-min',
      sourcemap: false
    },
    external: [],
    plugins: [
      resolve(),
      commonjs({}),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser()
    ]
  }
]

const umd = [
  // Universal module definition (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/flexible-string-replace.js',
      exports: 'named',
      format: 'umd',
      globals: {},
      name: 'fsr-umd',
      sourcemap: false
    },
    external: [],
    plugins: [
      resolve(),
      commonjs({}),
      typescript({ tsconfig: './tsconfig.build.json' })
    ]
  },

  // Minified (UMD) build
  {
    input: './source/index.ts',
    output: {
      file: './dist/umd/flexible-string-replace.min.js',
      exports: 'named',
      format: 'umd',
      globals: {},
      name: 'fsr-umd',
      sourcemap: false
    },
    external: [],
    plugins: [
      resolve(),
      commonjs({}),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser()
    ]
  }
]

let config

switch (process.env.BUILD_ENV) {
  case 'cjs':
    config = cjs
    break
  case 'esm':
    config = esm
    break
  case 'umd':
    config = umd
    break
  default:
    config = cjs.concat(esm).concat(umd)
}

export default config
