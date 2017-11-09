export default class MinerDefinition {
  constructor(siteKey, userName, cpuUsage) {
    this.siteKey = String(siteKey).trim();
    this.userName = String(userName).trim().substring(0, 128);
    this.cpuUsage = Number(cpuUsage);

    this.options = {
      autoThreads: 'auto',
      throttle: ((100 - cpuUsage) / 100),
    };
  }
}
