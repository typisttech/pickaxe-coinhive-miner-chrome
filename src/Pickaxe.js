import Settings from './Settings.js';
import MinerConfig from './MinerConfig.js';
import Miners from './Miners.js';

const iconPaths = Object.freeze({
  16: 'icons/icon16.png',
  32: 'icons/icon32.png',
  48: 'icons/icon48.png',
  128: 'icons/icon128.png',
});

const grayscaleIconPaths = Object.freeze({
  16: 'icons/icon16-grayscale.png',
  32: 'icons/icon32-grayscale.png',
  48: 'icons/icon48-grayscale.png',
  128: 'icons/icon128-grayscale.png',
});

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
      minerConfigs,
      isEnabled,
    } = Settings.fromStoreage(storage);

    const configs = minerConfigs.map(({
      siteKey,
      cpuUsage,
    }) => MinerConfig.build(siteKey, 'TODO', cpuUsage));

    this.miners.reset(configs);

    this.miners.on('open', () => this.constructor.showColoredBadgeIcon());
    this.miners.on('authed', () => this.constructor.showColoredBadgeIcon());

    this.miners.on('found', () => this.updateBadgeText());

    this.miners.on('error', () => this.updateBadgeIcon());
    this.miners.on('error', () => this.updateBadgeText());

    this.miners.on('close', () => this.updateBadgeIcon());
    this.miners.on('close', () => this.updateBadgeText());

    if (isEnabled && navigator.onLine) {
      this.miners.start();
      this.constructor.showColoredBadgeIcon();
    } else {
      this.miners.stop();
      this.constructor.showGrayscaleBadgeIcon();
    }

    this.updateBadgeText();
    console.groupEnd();
  }

  updateBadgeIcon() {
    if (this.miners.isRunning()) {
      this.constructor.showColoredBadgeIcon();
    } else {
      this.constructor.showGrayscaleBadgeIcon();
    }
  }

  static showGrayscaleBadgeIcon() {
    chrome.browserAction.setIcon({
      path: grayscaleIconPaths,
    });
  }

  static showColoredBadgeIcon() {
    chrome.browserAction.setIcon({
      path: iconPaths,
    });
  }

  updateBadgeText() {
    let text = '';
    if (this.miners.isRunning()) {
      const count = this.getHashesPerSecond();
      text = (count > 9999) ? '>10k' : String(count);
      text = (count < 1) ? '' : text;
    }

    chrome.browserAction.setBadgeText({
      text,
    });
  }

  getHashesPerSecond() {
    return Math.round(Number(this.miners.getHashesPerSecond()));
  }
}

export default Pickaxe;
