import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

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
    terser()
  ]
};
