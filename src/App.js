/* eslint class-methods-use-this: ["error", { "exceptMethods": ["toggle"] }] */
import Badge from './Badge';
import Miners from './Miners';
import Notification from './Notification';
import Settings from './Settings';
import Storage from './Storage';
import CoinHiveCop from './Cops/CoinHiveCop';
import InternetConnectionCop from './Cops/InternetConnectionCop';
import SettingsCop from './Cops/SettingsCop';

class App {
  constructor() {
    this.miners = new Miners();
    this.notification = new Notification();
    this.cops = [
      new SettingsCop(),
      new InternetConnectionCop(),
      new CoinHiveCop(this.notification),
    ];
  }

  toggle() {
    Storage.get((storage) => {
      const {
        isEnabled,
      } = Settings.fromStoreage(storage);
      Storage.set({
        isEnabled: !isEnabled,
      });
    });
  }

  run() {
    Storage.get((storage) => {
      const settings = Settings.fromStoreage(storage);
      const shouldMine = this.shouldMine(settings);
      const minerDefinitions = (shouldMine) ? settings.minerDefinitions : [];

      this.resetUi(shouldMine);

      this.check();

      this.resetMiners(minerDefinitions);
      this.miners.start();
    });
  }

  shouldMine(settings) {
    return this.cops.reduce((shouldMine, cop) => shouldMine && cop.shouldMine(settings), true);
  }

  resetUi(shouldMine) {
    this.notification.reset();

    Badge.updateIcon(shouldMine);
    Badge.updateText(0);
  }

  check() {
    this.cops.forEach(cop => cop.check());
  }

  resetMiners(minerDefinitions) {
    this.miners.reset(minerDefinitions);

    this.miners.on('open', () => Badge.showColoredIcon());

    this.miners.on('authed', () => Badge.showColoredIcon());

    this.miners.on('found', () => Badge.updateText(this.getHashesPerSecond()));

    this.miners.on('error', () => Badge.updateIcon(this.isMining()));
    this.miners.on('error', () => Badge.updateText(this.getHashesPerSecond()));
    this.miners.on('error', (siteKey, params) => {
      this.notification.minerError(siteKey, params);
    });

    this.miners.on('close', () => Badge.updateIcon(this.isMining()));
    this.miners.on('close', () => Badge.updateText(this.getHashesPerSecond()));
  }

  isMining() {
    return this.miners.isRunning();
  }

  getHashesPerSecond() {
    return Math.trunc(this.miners.getHashesPerSecond());
  }
}

export default App;
