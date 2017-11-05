import donateSiteKey from './src/donateSiteKey.js';
import Settings from './src/Settings.js';
import MinerConfig from './src/MinerConfig.js';
import Miners from './src/Miners.js';

// Initialize empty miners.
const miners = new Miners([]);

const pickaxe = () => {
  chrome.storage.local.get(['isEnabled', 'mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    console.group('Pickaxe');
    const settings = Settings.fromStoreage(storage);

    miners.reset([
      MinerConfig.build(settings.mainSiteKey, 'Main', settings.mainSpeed),
      MinerConfig.build(settings.referrerSiteKey, 'Referrer', 5),
      MinerConfig.build(donateSiteKey, 'Donate', 10),
    ]);

    if (settings.isEnabled && navigator.onLine) {
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
      isEnabled: !settings.isEnabled,
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
