export default class {
  constructor(configs) {
    console.group('Miners: init');
    this._miners = [];
    this.reset(configs);
    console.groupEnd();
  }

  reset(configs) {
    console.group('Miners: reset');
    this.stop();

    this._miners = [];
    configs.forEach(function(config) {
      const miner =  new CoinHive.User(config.siteKey, config.userName, config.options);
      this._miners.push(miner);
    }, this);

    console.debug('Miners: ', this._miners);
    console.groupEnd();
  }

  start() {
    console.group('Miners: start');
    this._miners.forEach(function(miner) {
      miner.start(CoinHive.FORCE_MULTI_TAB);
    });
    console.groupEnd();
  }

  stop() {
    console.group('Miners: stop');
    this._miners.forEach(function(miner) {
      miner.stop();
    });
    console.groupEnd();
  }
}
