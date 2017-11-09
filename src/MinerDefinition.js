const clamp = (x, lower, upper) => Math.max(lower, Math.min(x, upper));

export default class MinerDefinition {
  constructor(siteKey, userName, cpuUsage) {
    this.siteKey = String(siteKey).trim();
    this.userName = String(userName).trim().substring(0, 128);
    this.cpuUsage = clamp(Math.trunc(cpuUsage), 1, 99);

    this.options = {
      autoThreads: 'auto',
      throttle: ((100 - cpuUsage) / 100),
    };
  }
}
