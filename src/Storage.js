/* global chrome:true */
export default class Storage {
  static get(callback) {
    chrome.storage.local.get(null, (storage) => {
      callback(storage);
    });
  }

  static set(item, callback = () => {}) {
    chrome.storage.local.set(item, (storage) => {
      callback(storage);
    });
  }

  static addonChangedListener(listener) {
    chrome.storage.onChanged.addListener(listener);
  }
}
