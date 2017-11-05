import Settings from './src/Settings.js';

const updateFaq = () => {
  chrome.storage.local.get(['mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    const settings = Settings.fromStoreage(storage);

    ['main', 'referrer', 'donate'].forEach((key) => {
      document.getElementById(key + 'SiteKeyFaq').innerHTML = settings[key + 'SiteKey'];
      document.getElementById(key + 'SpeedFaq').innerHTML = settings[key + 'Speed'] + ' %';
    });
  });
}

chrome.storage.onChanged.addListener(updateFaq);
document.addEventListener('DOMContentLoaded', updateFaq);

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
