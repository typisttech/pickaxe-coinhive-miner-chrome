/* global CoinHive:true */
/* eslint no-underscore-dangle: ["error", { "allow": ["_siteKey"] }] */
/* eslint no-console: "off" */
export default class Miners {
  constructor() {
    console.log('Miners: init');
    this.miners = [];
  }

  reset(configs) {
    console.log('Miners: reset');
    this.stop();

    this.miners = [];
    configs.forEach(({
      siteKey,
      userName,
      options,
    }) => {
      const miner = (userName) ?
        new CoinHive.User(siteKey, userName, options) :
        new CoinHive.Anonymous(siteKey, options);

      this.miners.push(miner);
    }, this);

    console.log('Miners: ', this.miners);
  }

  on(eventName, callback) {
    this.miners.forEach((miner) => {
      miner.on(eventName, params => callback(miner._siteKey, params));
    });
  }

  start() {
    console.log('Miners: start');
    this.miners.forEach((miner) => {
      miner.start(CoinHive.FORCE_MULTI_TAB);
    });
  }

  stop() {
    console.log('Miners: stop');
    this.miners.forEach((miner) => {
      miner.stop();
    });
  }

  isRunning() {
    return this.miners.reduce((anyRunning, miner) => anyRunning || miner.isRunning(), false);
  }

  getHashesPerSecond() {
    return this.miners.reduce((sum, miner) => sum + miner.getHashesPerSecond(), 0);
  }
}
