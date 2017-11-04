import {
  DONATE_SITE_KEY,
  DEFAULT_OPTIONS,
} from './constants.js';
import Miners from './miners.js';

const minerConfig = (siteKey, userNameSuffix, speed) => ({
  siteKey,
  userName: `Pickaxe Coinhive Miner Chrome: ${userNameSuffix}`,
  options: {
    autoThreads: 'auto',
    throttle: ((100 - speed) / 100),
  },
});

// Initialize empty miners.
const miners = new Miners([]);

const pickaxe = () => {
  chrome.storage.local.get(['isEnabled', 'mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    console.group('Pickaxe');
    const options = Object.assign({}, DEFAULT_OPTIONS, storage);

    miners.reset([
      minerConfig(options.mainSiteKey, 'Main', options.mainSpeed),
      minerConfig(options.referrerSiteKey, 'Referrer', 5),
      minerConfig(DONATE_SITE_KEY, 'Donate', 10),
    ]);

    if (options.isEnabled && navigator.onLine) {
      chrome.browserAction.setIcon({
        path: 'icons/icon48.png',
      });
      miners.start();
    } else {
      chrome.browserAction.setIcon({
        path: 'icons/icon48-grayscale.png',
      });
    }

    console.groupEnd();
  });
};

const toggleIsEnabled = () => {
  chrome.storage.local.get('isEnabled', (options) => {
    chrome.storage.local.set({
      isEnabled: !options.isEnabled,
    });
  });
};

// Run on page load.
window.addEventListener('load', pickaxe);

// Re-run when changed.
chrome.storage.onChanged.addListener(pickaxe);
window.addEventListener('online', pickaxe);
window.addEventListener('offline', pickaxe);

// Menu icon clicks.
chrome.browserAction.onClicked.addListener(toggleIsEnabled);
