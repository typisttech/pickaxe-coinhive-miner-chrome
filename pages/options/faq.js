/* global document:true */
import Settings from '../../src/Settings';
import Storage from '../../src/Storage';

const siteKeyHelpText = (siteKey) => {
  if (Settings.isDonateSiteKey(siteKey)) {
    return '<br/><small class="text-muted">(Extension Author)</small>';
  }
  return '';
};

const addRowWithValues = ({
  siteKey,
  userName,
  cpuUsage,
}) => {
  const rowHtml = `
  <tr>
  <th scope="row">
    <code>${siteKey}</code>
    ${siteKeyHelpText(siteKey)}
  </th>
  <td>
    ${userName}
  </td>
  <td class="text-center">
    ${cpuUsage} %
  </td>
  </tr>
  `;

  const tbody = document.getElementById('faq-miner-settings-tbody');
  tbody.insertAdjacentHTML('beforeend', rowHtml);
};

const updateFaqValues = () => {
  Storage.get((storage) => {
    const {
      minerDefinitions,
    } = Settings.fromStoreage(storage);

    // Reset tbody
    document.getElementById('faq-miner-settings-tbody').innerHTML = '';

    minerDefinitions.forEach((config) => {
      addRowWithValues(config);
    });
  });
};

Storage.addonChangedListener(updateFaqValues);
document.addEventListener('DOMContentLoaded', updateFaqValues);
