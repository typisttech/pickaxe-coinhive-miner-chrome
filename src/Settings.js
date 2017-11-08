const donateSiteKey = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';

const donateMinerConfig = Object.freeze({
  siteKey: donateSiteKey,
  cpuUsage: 10,
});

const defaultSettings = Object.freeze({
  isEnabled: true,
});

class Settings {
  static fromStoreage(storage) {
    const tempSettings = Object.assign({}, defaultSettings, storage);
    tempSettings.minerConfigs = tempSettings.userMinerConfigs.concat(donateMinerConfig);
    return Object.freeze(tempSettings);
  }

  static isDonateSiteKey(siteKey) {
    return donateSiteKey === siteKey;
  }
}

export default Settings;
