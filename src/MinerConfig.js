const {
  short_name: shortName,
  version,
} = chrome.runtime.getManifest();

class MinerConfig {
  static build(siteKey, userNameSuffix, speed) {
    return {
      siteKey,
      userName: `${shortName} (${version}): ${userNameSuffix}`,
      options: {
        autoThreads: 'auto',
        throttle: ((100 - speed) / 100),
      },
    };
  }
}

export default MinerConfig;
