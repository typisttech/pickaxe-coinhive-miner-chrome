const version = chrome.runtime.getManifest().version;

class MinerConfig {
  static build(siteKey, userNameSuffix, speed) {
    return {
      siteKey,
      userName: `PickaxeCoinhiveChrome (${version}): ${userNameSuffix}`,
      options: {
        autoThreads: 'auto',
        throttle: ((100 - speed) / 100),
      },
    };
  }
}

export default MinerConfig;
