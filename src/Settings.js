const donateSiteKey = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';

const defaultSettings = Object.freeze({
  isEnabled: true,
  mainSiteKey: donateSiteKey,
  mainSpeed: 20,
  referrerSiteKey: donateSiteKey,
});

const forceOverrideSettings = Object.freeze({
  referrerSpeed: 5,
  donateSiteKey,
  donateSpeed: 10,
});

class Settings {
  static fromStoreage(storage) {
    return Object.assign({}, defaultSettings, storage, forceOverrideSettings);
  }
}

export default Settings;
