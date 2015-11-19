import merge from 'lodash/object/merge';
import webpack from 'webpack';
import fs from 'graceful-fs';
import path from 'path';
import * as config from './config';

const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc'), 'utf8'));

export default merge({}, config, {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ].concat(config.entry.main)
  },
  module: {
    loaders: config.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: merge({}, babelrc, {
          plugins: [
            'react-transform'
          ],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }
          }
        })
      },
      {
        test: /\.css$/,
        loader: 'style!css?-minimize!postcss'
      }
    ])
  },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});
