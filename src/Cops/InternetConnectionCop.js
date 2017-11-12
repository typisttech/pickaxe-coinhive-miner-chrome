/* global navigator:true */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["check", "shouldMine"] }] */
export default class InternetConnectionCop {
  shouldMine() {
    return navigator.onLine;
  }

  check() {}
}
