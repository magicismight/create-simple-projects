import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    generatedCode: 'es5'
  },
  plugins: [
    typescript(),
    babel({
      babelrc: true
    }),
    terser({
      format: {
        comments: false
      }
    }),
    commonjs({
      include: ['node_modules/**'],
      ignoreGlobal: false,
      sourceMap: false
    }),
    nodeResolve({
      jsnext: true,
      main: false
    })
  ]
};
