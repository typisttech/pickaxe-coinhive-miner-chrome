/* global chrome:true window:true */

import App from './src/App.js';
import Storage from './src/Storage.js';

const app = new App();

// Run on page load.
window.addEventListener('load', () => app.run());

// Re-run when changed.
Storage.addonChangedListener(() => app.run());
window.addEventListener('online', () => app.run());
window.addEventListener('offline', () => app.run());

// Menu icon clicks.
chrome.browserAction.onClicked.addListener(() => app.constructor.toggle());

chrome.runtime.onInstalled.addListener(() => chrome.runtime.openOptionsPage());
