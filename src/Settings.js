const donateSiteKey = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';

const defaultSettings = Object.freeze({
  isEnabled: true,
  mainSiteKey: donateSiteKey,
  mainSpeed: 20,
  referrerSiteKey: donateSiteKey,
});

const forceSettings = Object.freeze({
  donateSiteKey: donateSiteKey,
});

class Settings {
  static fromStoreage(storage) {
    return Object.assign({}, defaultSettings, storage, forceSettings);
  }
}

export default Settings;
