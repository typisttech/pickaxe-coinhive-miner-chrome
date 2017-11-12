/* eslint class-methods-use-this: ["error", { "exceptMethods": ["check", "shouldMine"] }] */
export default class SettingsCop {
  shouldMine({
    isEnabled,
  }) {
    return isEnabled;
  }

  check() {}
}
