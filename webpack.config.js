import ExtractTextPlugin from "extract-text-webpack-plugin";
import externals from 'webpack-node-externals';
import path from  'path';

export default [
  {
    entry: './client',
    output: {
      path: path.resolve('dist'),
      filename: 'client.js'
    },
    devtool: 'cheap-source-map',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('client.css')
    ]
  },
  {
    entry: {
      server: './server',
      loader: './server/loader'
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js'
    },
    devtool: 'cheap-source-map',
    target: 'node',
    externals: externals(),
    node: {
      __dirname: false
    }
  }
];
