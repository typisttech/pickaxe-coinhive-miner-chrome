/* global chrome:true */
import MinerDefinition from './MinerDefinition';

const {
  short_name: shortName,
  version,
} = chrome.runtime.getManifest();

const donateSiteKey = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';

const donateMinerDefinition = Object.freeze(new MinerDefinition(
  donateSiteKey,
  `${shortName} (${version})`,
  10,
));

const defaultSettings = Object.freeze({
  isEnabled: true,
  userMinerSettings: [],
});

class Settings {
  static fromStoreage(storage) {
    const settings = Object.assign({}, defaultSettings, storage);

    settings.userMinerDefinitions = settings.userMinerSettings.map(({
      siteKey,
      userName,
      cpuUsage,
    }) => Object.freeze(new MinerDefinition(siteKey, userName, cpuUsage)));

    settings.minerDefinitions = settings.userMinerDefinitions.concat(donateMinerDefinition);

    return Object.freeze(settings);
  }

  static isDonateSiteKey(siteKey) {
    return donateSiteKey === siteKey;
  }
}

export default Settings;
