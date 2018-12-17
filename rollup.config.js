import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'lib/util.js',
  output: {
    file: './dist/util.js',
    format: 'umd',
    name: 'util'
  },
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    })
  ]
};
