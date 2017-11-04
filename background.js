import Miners from './miners.js';

const DONATE_SITE_KEY = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';
const DEFAULT_OPTIONS = Object.freeze({
  isEnabled: true,
  mainSiteKey: DONATE_SITE_KEY,
  mainThrottle: 0.2,
  referralSiteKey: DONATE_SITE_KEY,
});

const minerConfig = (siteKey, userNameSuffix, throttle) => ({
  siteKey,
  userName: `Pickaxe Coinhive Miner Chrome: ${userNameSuffix}`,
  options: {
    autoThreads: 'auto',
    throttle,
  },
});

// Initialize empty miners.
const miners = new Miners([]);

const pickaxe = () => {
  chrome.storage.local.get(['isEnabled', 'mainSiteKey', 'mainThrottle', 'referralSiteKey'], (storage) => {
    console.group('Pickaxe');
    const options = Object.assign({}, DEFAULT_OPTIONS, storage);

    miners.reset([
      minerConfig(options.mainSiteKey, 'Main', options.mainThrottle),
      minerConfig(options.referralSiteKey, 'Referral', 0.05),
      minerConfig(DONATE_SITE_KEY, 'Donate', 0.1),
    ]);

    if (options.isEnabled && navigator.onLine) {
      chrome.browserAction.setIcon({ path: 'icons/icon48.png' });
      miners.start();
    } else {
      chrome.browserAction.setIcon({ path: 'icons/icon48-grayscale.png' });
    }

    console.groupEnd();
  });
};

const toggleIsEnabled = () => {
  chrome.storage.local.get('isEnabled', (options) => {
    chrome.storage.local.set({ isEnabled: !options.isEnabled });
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
