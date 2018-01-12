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
      setTimeout(() => {
        chrome.runtime.reload();
      }, 60000);
    } else {
      this.notification.coinhiveOffline();
    }
  }
}
