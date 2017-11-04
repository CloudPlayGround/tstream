const consul = require('consul')();

class AppConsul {
  constructor() {
    this.watchMap = {};
    this.watchValues = {};
  }

  watch(key) {
    const self = this;
    if (!this.watchMap[key]) {
      this.watchMap[key] = consul.watch({ method: consul.kv.get, options: { key }});
      this.watchMap[key].on('change', function(data, res) {
        console.log('Consule data:', data);
        self.watchValues[key] = data.Value;
      });
    }
  }
}

const singletonAppConsul = new AppConsul();

singletonAppConsul.watch('twitter/stream-enabled');

module.exports = singletonAppConsul;
