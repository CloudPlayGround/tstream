const twitter = require('./twitter/twitter.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(twitter);
};
