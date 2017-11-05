import donateSiteKey from './src/donateSiteKey.js';
import Settings from './src/Settings.js';

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
    const options = Settings.fromStoreage(storage);

    document.getElementById('mainSiteKey').value = options.mainSiteKey;
    document.getElementById('mainSpeed').value = options.mainSpeed;
    document.getElementById('referrerSiteKey').value = options.referrerSiteKey;
  });
});
