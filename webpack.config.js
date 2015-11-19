if (process.env.NODE_ENV === 'development') {
  module.exports = require('./webpack/dev.config');
} else {
  module.exports = require('./webpack/prod.config');
}
