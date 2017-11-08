const {
  short_name: shortName,
  version,
} = chrome.runtime.getManifest();

class MinerConfig {
  static build(siteKey, userNameSuffix, cpuUsage) {
    return {
      siteKey,
      userName: `${shortName} (${version}): ${userNameSuffix}`,
      options: {
        autoThreads: 'auto',
        throttle: ((100 - cpuUsage) / 100),
      },
    };
  }
}

export default MinerConfig;
