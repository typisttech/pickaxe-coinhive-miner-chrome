/* global chrome:true window:true */

import Pickaxe from './src/Pickaxe.js';
import Storage from './src/Storage.js';

const pickaxe = new Pickaxe();

// Run on page load.
window.addEventListener('load', () => pickaxe.run());

// Re-run when changed.
Storage.addonChangedListener(() => pickaxe.run());
window.addEventListener('online', () => pickaxe.run());
window.addEventListener('offline', () => pickaxe.run());

// Menu icon clicks.
chrome.browserAction.onClicked.addListener(() => pickaxe.constructor.toggle());

chrome.runtime.onInstalled.addListener(() => chrome.runtime.openOptionsPage());
