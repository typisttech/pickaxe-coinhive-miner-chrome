/* global chrome:true */

const {
  short_name: shortName,
  version,
} = chrome.runtime.getManifest();

class MinerDefinition {
  constructor(siteKey, userNameSuffix, cpuUsage) {
    this.siteKey = siteKey;
    this.userNameSuffix = userNameSuffix;
    this.cpuUsage = cpuUsage;

    this.userName = `${shortName} (${version}): ${userNameSuffix}`;
    this.options = {
      autoThreads: 'auto',
      throttle: ((100 - cpuUsage) / 100),
    };
  }
}

export default MinerDefinition;
