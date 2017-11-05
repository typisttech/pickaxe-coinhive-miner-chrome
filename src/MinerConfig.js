export default class MinerConfig {
  static build(siteKey, userNameSuffix, speed) {
    return {
      siteKey,
      userName: `PickaxeCoinhiveChrome: ${userNameSuffix}`,
      options: {
        autoThreads: 'auto',
        throttle: ((100 - speed) / 100),
      },
    };
  }
}
