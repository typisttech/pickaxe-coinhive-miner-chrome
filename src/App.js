/* global chrome:true, navigator:true */
import Badge from './Badge.js';
import Miners from './Miners.js';
import Notification from './Notification.js';
import Settings from './Settings.js';
import Storage from './Storage.js';

class App {
  constructor() {
    this.miners = new Miners();
    this.notification = new Notification();
  }

  static toggle() {
    Storage.get((storage) => {
      const {
        isEnabled,
      } = Settings.fromStoreage(storage);
      Storage.set({
        isEnabled: !isEnabled,
      });
    });
  }

  run() {
    Storage.get((storage) => {
      const {
        minerDefinitions,
        isEnabled,
      } = Settings.fromStoreage(storage);
      const shouldMine = this.shouldMine(isEnabled);
      const finalMinerDefinitions = (shouldMine) ? minerDefinitions : [];

      this.notification.reset();

      Badge.updateIcon(shouldMine);
      Badge.updateText(0);

      this.checkCoinhive(isEnabled);

      this.resetMiners(finalMinerDefinitions);
      this.miners.start();
    });
  }

  shouldMine(isEnabled) {
    return isEnabled && navigator.onLine && typeof CoinHive !== 'undefined';
  }

  checkCoinhive(isEnabled) {
    if (typeof CoinHive !== 'undefined' || !isEnabled) {
      return;
    }

    if (navigator.onLine) {
      chrome.runtime.reload();
    } else {
      this.notification.coinhiveOffline();
    }
  }

  resetMiners(minerDefinitions) {
    this.miners.reset(minerDefinitions);

    this.miners.on('open', () => Badge.showColoredIcon());

    this.miners.on('authed', () => Badge.showColoredIcon());

    this.miners.on('found', () => Badge.updateText(this.getHashesPerSecond()));

    this.miners.on('error', () => Badge.updateIcon(this.isMining()));
    this.miners.on('error', () => Badge.updateText(this.getHashesPerSecond()));
    this.miners.on('error', (siteKey, params) => {
      this.notification.minerError(siteKey, params);
    });

    this.miners.on('close', () => Badge.updateIcon(this.isMining()));
    this.miners.on('close', () => Badge.updateText(this.getHashesPerSecond()));
  }

  isMining() {
    return this.miners.isRunning();
  }

  getHashesPerSecond() {
    return Math.trunc(this.miners.getHashesPerSecond());
  }
}

export default App;
