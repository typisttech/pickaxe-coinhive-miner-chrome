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
    Storage.get(storage => this.reset(storage));
  }

  reset(storage) {
    const {
      minerDefinitions,
      isEnabled,
    } = Settings.fromStoreage(storage);

    this.notification.reset();

    if (isEnabled && typeof CoinHive === 'undefined') {
      if (navigator.onLine) {
        chrome.runtime.reload();
      } else {
        this.notification.coinhiveOffline();
      }
    }

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

    Badge.updateText(0);
    if (isEnabled && navigator.onLine) {
      Badge.showColoredIcon();
      this.miners.start();
    } else {
      Badge.showGrayscaleIcon();
      this.miners.stop();
    }
  }

  isMining() {
    return this.miners.isRunning();
  }

  getHashesPerSecond() {
    return Math.trunc(this.miners.getHashesPerSecond());
  }
}

export default App;
