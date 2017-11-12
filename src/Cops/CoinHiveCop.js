/* global chrome:true, navigator:true */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["shouldMine"] }] */
export default class CoinHiveCop {
  constructor(notification) {
    this.notification = notification;
  }

  shouldMine() {
    return (typeof CoinHive !== 'undefined');
  }

  check() {
    if (this.shouldMine()) {
      return;
    }

    if (navigator.onLine) {
      chrome.runtime.reload();
    } else {
      this.notification.coinhiveOffline();
    }
  }
}
