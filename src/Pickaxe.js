import Settings from './Settings.js';
import Badge from './Badge.js';
import Miners from './Miners.js';

class Pickaxe {
  constructor() {
    this.miners = new Miners();
  }

  static toggle() {
    console.group('Pickaxe: toggle');
    chrome.storage.local.get(null, (storage) => {
      const settings = Settings.fromStoreage(storage);
      chrome.storage.local.set({
        isEnabled: !settings.isEnabled,
      });
    });
    console.groupEnd();
  }

  run() {
    console.group('Pickaxe: run');
    chrome.storage.local.get(null, storage => this.reset(storage));
    console.groupEnd();
  }

  reset(storage) {
    console.group('Pickaxe: reset');
    const {
      minerDefinitions,
      isEnabled,
    } = Settings.fromStoreage(storage);

    this.miners.reset(minerDefinitions);

    this.miners.on('open', () => Badge.showColoredIcon());
    this.miners.on('authed', () => Badge.showColoredIcon());

    this.miners.on('found', () => Badge.updateText(this.getHashesPerSecond()));

    this.miners.on('error', () => Badge.updateIcon(this.isMining()));
    this.miners.on('error', () => Badge.updateText(this.getHashesPerSecond()));

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
    return Math.round(Number(this.miners.getHashesPerSecond()));
  }
}

export default Pickaxe;
