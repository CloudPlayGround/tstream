const assert = require('assert');
const app = require('../../src/app');

describe('\'twitter\' service', () => {
  it('registered the service', () => {
    const service = app.service('twitter');

    assert.ok(service, 'Registered the service');
  });
});
