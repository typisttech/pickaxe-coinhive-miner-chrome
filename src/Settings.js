import MinerDefinition from './MinerDefinition.js';

const donateSiteKey = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';

const donateMinerSettings = Object.freeze({
  siteKey: donateSiteKey,
  cpuUsage: 10,
});

const defaultSettings = Object.freeze({
  isEnabled: true,
  userMinerSettings: [],
});

class Settings {
  static fromStoreage(storage) {
    const settings = Object.assign({}, defaultSettings, storage);

    const rawMinerSettings = settings.userMinerSettings.concat(donateMinerSettings);
    settings.minerDefinitions = rawMinerSettings.map(({
      siteKey,
      cpuUsage,
    }) => Object.freeze(new MinerDefinition(siteKey, 'TODO', cpuUsage)));

    return Object.freeze(settings);
  }

  static isDonateSiteKey(siteKey) {
    return donateSiteKey === siteKey;
  }
}

export default Settings;
