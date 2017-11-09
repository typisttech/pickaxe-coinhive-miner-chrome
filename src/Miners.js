/* global CoinHive:true */

export default class Miners {
  constructor() {
    console.group('Miners: init');
    this.miners = [];
    console.groupEnd();
  }

  reset(configs) {
    console.group('Miners: reset');
    this.stop();

    this.miners = [];
    configs.forEach((config) => {
      const miner = new CoinHive.User(config.siteKey, config.userName, config.options);
      this.miners.push(miner);
    }, this);

    console.debug('Miners: ', this.miners);
    console.groupEnd();
  }

  on(eventName, callback) {
    this.miners.forEach((miner) => {
      miner.on(eventName, callback);
    });
  }

  start() {
    console.group('Miners: start');
    this.miners.forEach((miner) => {
      miner.start(CoinHive.FORCE_MULTI_TAB);
    });
    console.groupEnd();
  }

  stop() {
    console.group('Miners: stop');
    this.miners.forEach((miner) => {
      miner.stop();
    });
    console.groupEnd();
  }

  isRunning() {
    return this.miners.reduce((anyRunning, miner) => anyRunning || miner.isRunning(), false);
  }

  getHashesPerSecond() {
    return this.miners.reduce((sum, miner) => sum + miner.getHashesPerSecond(), 0);
  }
}
