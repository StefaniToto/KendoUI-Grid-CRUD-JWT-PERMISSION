const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function createConfig(target) {
  return {
    entry: { app: ['./src/public_api.ts'] },
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
    },
    plugins: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new webpack.NormalModuleReplacementPlugin(/environment\.ts/, './environment.prod.ts')
    ]
  };
}

module.exports = [createConfig('var'), createConfig('commonjs2'), createConfig('amd'), createConfig('umd')];
