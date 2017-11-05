import donateSiteKey from './donateSiteKey.js';

const defaultSettings = Object.freeze({
  isEnabled: true,
  mainSiteKey: donateSiteKey,
  mainSpeed: 20,
  referrerSiteKey: donateSiteKey,
});

class Settings {
  static fromStoreage(storage) {
    return Object.assign({}, defaultSettings, storage);
  }
};

export default Settings;
