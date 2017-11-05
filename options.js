import donateSiteKey from './src/donateSiteKey.js';
import Settings from './src/Settings.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('option-form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    const settings = {
      mainSiteKey: document.getElementById('mainSiteKey').value,
      mainSpeed: document.getElementById('mainSpeed').value,
      referrerSiteKey: document.getElementById('referrerSiteKey').value,
    };

    chrome.storage.local.set(settings, () => {
      document.getElementById('form-saved-alert').style.display = 'block';
    });
  });

  chrome.storage.local.get(['mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    const settings = Settings.fromStoreage(storage);

    document.getElementById('mainSiteKey').value = settings.mainSiteKey;
    document.getElementById('mainSpeed').value = settings.mainSpeed;
    document.getElementById('referrerSiteKey').value = settings.referrerSiteKey;
  });
});
