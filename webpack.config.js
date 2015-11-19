require('babel-core/register');

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./webpack/dev.config').default;
} else {
  module.exports = require('./webpack/prod.config').default;
}

