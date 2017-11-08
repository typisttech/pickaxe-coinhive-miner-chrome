import Settings from './src/Settings.js';

const siteKeyHelpText = (siteKey) => {
  if (Settings.isDonateSiteKey(siteKey)) {
    return '<br/><small class="text-muted">(Extension Author)</small>';
  }
  return '';
};

const addRowWithValues = ({
  siteKey,
  cpuUsage,
}) => {
  const rowHtml = `
  <tr>
  <th scope="row">
    <code>${siteKey}</code>
    ${siteKeyHelpText(siteKey)}
  </th>
  <td class="text-center">
  ${cpuUsage} %
  </td>
  </tr>
  `;

  const tbody = document.getElementById('faq-miner-configs-tbody');
  tbody.insertAdjacentHTML('beforeend', rowHtml);
};

const updateFaqValues = () => {
  chrome.storage.local.get(null, (storage) => {
    const {
      minerConfigs,
    } = Settings.fromStoreage(storage);

    // Reset tbody
    document.getElementById('faq-miner-configs-tbody').innerHTML = '';

    minerConfigs.forEach((config) => {
      addRowWithValues(config);
    });
  });
};

chrome.storage.onChanged.addListener(updateFaqValues);
document.addEventListener('DOMContentLoaded', updateFaqValues);
