/* global navigator:true */

import Badge from './Badge.js';
import Miners from './Miners.js';
import Notification from './Notification.js';
import Settings from './Settings.js';
import Storage from './Storage.js';

class Pickaxe {
  constructor() {
    this.miners = new Miners();
    this.notification = new Notification();
  }

  static toggle() {
    console.group('Pickaxe: toggle');
    Storage.get((storage) => {
      const {
        isEnabled
      } = Settings.fromStoreage(storage);
      Storage.set({
        isEnabled: !isEnabled,
      });
    });
    console.groupEnd();
  }

  run() {
    console.group('Pickaxe: run');
    Storage.get(storage => this.reset(storage));
    console.groupEnd();
  }

  reset(storage) {
    console.group('Pickaxe: reset');
    const {
      minerDefinitions,
      isEnabled,
    } = Settings.fromStoreage(storage);

    this.miners.reset(minerDefinitions);
    this.notification.reset();

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

    console.groupEnd();
  }

  isMining() {
    return this.miners.isRunning();
  }

  getHashesPerSecond() {
    return Math.trunc(this.miners.getHashesPerSecond());
  }
}

export default Pickaxe;
