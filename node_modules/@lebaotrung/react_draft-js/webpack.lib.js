const path = require('path');
const webpack = require('webpack');

function createConfig(target) {
  return {
    entry: { app: ['./src/public_api.ts'] },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules|dist|lib/
        },
        {
          test: /\.tsx$/,
          use: 'awesome-typescript-loader',
          exclude: /node_modules|dist|lib/
        },
        {
          test: /\.html$/,
          use: { loader: 'raw-loader' },
          exclude: /node_modules|dist|lib/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: `app.${target}.js`,
      path: path.resolve(__dirname, 'lib'),
      library: 'TestComponent',
      libraryTarget: target
    }
  };
}

module.exports = [createConfig('var'), createConfig('commonjs2'), createConfig('amd'), createConfig('umd')];
