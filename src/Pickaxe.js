import Settings from './Settings.js';
import MinerConfig from './MinerConfig.js';
import Miners from './Miners.js';

export default class Pickaxe {
  constructor() {
    this.miners = new Miners();
  }

  static toggle() {
    console.group('Pickaxe: toggle');
    chrome.storage.local.get('isEnabled', (storage) => {
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
    const settings = Settings.fromStoreage(storage);

    this.miners.reset([
      MinerConfig.build(settings.mainSiteKey, 'Main', settings.mainSpeed),
      MinerConfig.build(settings.referrerSiteKey, 'Referrer', 5),
      MinerConfig.build(settings.donateSiteKey, 'Donate', 10),
    ]);

    this.constructor.shouldStart(settings) ? this.start() : this.constructor.stop();

    console.groupEnd();
  }

  static shouldStart(settings) {
    return (settings.isEnabled && navigator.onLine);
  }

  start() {
    chrome.browserAction.setIcon({
      path: {
        16: 'icons/icon16.png',
        32: 'icons/icon32.png',
        48: 'icons/icon48.png',
        128: 'icons/icon128.png',
      },
    });
    this.miners.start();
  }

  static stop() {
    chrome.browserAction.setIcon({
      path: {
        16: 'icons/icon16-grayscale.png',
        32: 'icons/icon32-grayscale.png',
        48: 'icons/icon48-grayscale.png',
        128: 'icons/icon128-grayscale.png',
      },
    });
  }
}
