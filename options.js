import {
  DEFAULT_OPTIONS,
} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('option-form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const options = {
      mainSiteKey: document.getElementById('mainSiteKey').value,
      mainSpeed: document.getElementById('mainSpeed').value,
      referrerSiteKey: document.getElementById('referrerSiteKey').value,
    };

    chrome.storage.local.set(options, () => {
      document.getElementById('form-saved-alert').style.display = 'block';
    });
  });

  chrome.storage.local.get(['mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, storage);

    document.getElementById('mainSiteKey').value = options.mainSiteKey;
    document.getElementById('mainSpeed').value = options.mainSpeed;
    document.getElementById('referrerSiteKey').value = options.referrerSiteKey;
  });
});
