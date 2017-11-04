// Initializes the `twitter` service on path `/twitter`
const createService = require('feathers-nedb');
const createModel = require('../../models/twitter.model');
const hooks = require('./twitter.hooks');
const filters = require('./twitter.filters');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const stream = client.stream('statuses/filter', { track: 'ICO' });

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'twitter',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/twitter', createService(options));


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('twitter');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  stream.on('data', function(event) {
    if (event && event.text) {
      service.create({
        tid: event.id,
        text: event.text
      });
    }
  });

  stream.on('error', function(error) {
    // throw error;
  });
};
