import Settings from './src/Settings.js';

const updateFormValues = () => {
  chrome.storage.local.get(['mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    const settings = Settings.fromStoreage(storage);

    ['mainSiteKey', 'mainSpeed', 'referrerSiteKey'].forEach((key) => {
      document.getElementById(key).value = settings[key];
    });
  });
};

const updateFaqValues = () => {
  chrome.storage.local.get(['mainSiteKey', 'mainSpeed', 'referrerSiteKey'], (storage) => {
    const settings = Settings.fromStoreage(storage);

    ['main', 'referrer', 'donate'].forEach((key) => {
      document.getElementById(`${key}SiteKeyFaq`).innerHTML = settings[`${key}SiteKey`];
      document.getElementById(`${key}SpeedFaq`).innerHTML = `${settings[`${key}Speed`]} %`;
    });
  });
};

chrome.storage.onChanged.addListener(updateFormValues);
document.addEventListener('DOMContentLoaded', updateFormValues);
chrome.storage.onChanged.addListener(updateFaqValues);
document.addEventListener('DOMContentLoaded', updateFaqValues);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('option-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const settings = {
      mainSiteKey: document.getElementById('mainSiteKey').value,
      mainSpeed: document.getElementById('mainSpeed').value,
      referrerSiteKey: document.getElementById('referrerSiteKey').value,
    };

    chrome.storage.local.set(settings, () => {
      document.getElementById('form-saved-alert').style.display = 'block';
    });
  });
});
