import path from 'path';
import webpack from 'webpack';
import postcssImport from 'postcss-import';
import precss from 'precss';
import cssnano from 'cssnano';

export default {
  entry: {
    main: [
      'babel-core/polyfill',
      './src/main'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  output: {
    libraryTarget: 'commonjs2',
    pathinfo: true,
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'jscs',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  postcss: webpack => ([
    postcssImport({
      addDependencyTo: webpack
    }),
    precss(),
    cssnano({
      zindex: false
    })
  ]),
  progress: true
};
