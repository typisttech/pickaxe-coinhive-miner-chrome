/* global document:true */
import Settings from '../../src/Settings.js';
import Storage from '../../src/Storage.js';

const getLast = nodeListOrArray => nodeListOrArray[nodeListOrArray.length - 1];

const removeRow = ({
  path,
}) => {
  const row = path.find(element => element.tagName === 'TR');

  row.parentNode.removeChild(row);
};

const addRow = () => {
  const rowHtml = `
  <tr>
  <th scope="row" class="align-middle">
    <div class="form-group">
      <input type="text" class="form-control" name="siteKeys[]" size="32" required>
    </div>
  </th>
  <td class="align-middle">
    <div class="form-group">
      <input type="text" class="form-control" name="userNames[]" size="25" maxlength="128">
    </div>
  </td>
  <td class="align-middle">
    <div class="form-group">
      <select class="custom-select form-control" name="cpuUsages[]">
        <option value="10">10 %</option>
        <option value="20">20 %</option>
        <option value="30">30 %</option>
        <option value="40">40 %</option>
        <option value="50">50 %</option>
        <option value="60">60 %</option>
        <option value="70">70 %</option>
        <option value="80">80 %</option>
        <option value="90">90 %</option>
      </select>
    </div>
  </td>
  <td class="text-center align-middle">
    <div class="form-group">
      <button type="button" class="btn btn-link btn-sm text-danger" name="remove-button">Remove</button>
    </div>
  </td>
  </tr>
  `;

  const tbody = document.getElementById('miner-settings-tbody');
  tbody.insertAdjacentHTML('beforeend', rowHtml);

  const removeButtons = document.getElementsByName('remove-button');
  const lastRemoveButton = getLast(removeButtons);
  lastRemoveButton.addEventListener('click', event => removeRow(event));
};

const getMinerSettingsElements = () => ({
  siteKeys: document.getElementsByName('siteKeys[]'),
  userNames: document.getElementsByName('userNames[]'),
  cpuUsages: document.getElementsByName('cpuUsages[]'),
});

const addRowWithValues = ({
  siteKey,
  userName,
  cpuUsage,
}) => {
  addRow();

  const {
    siteKeys,
    userNames,
    cpuUsages,
  } = getMinerSettingsElements();

  const lastSiteKey = getLast(siteKeys);
  const lastUserName = getLast(userNames);
  const lastCpuUsage = getLast(cpuUsages);

  lastSiteKey.value = siteKey;
  lastUserName.value = userName;
  lastCpuUsage.value = cpuUsage;
};

const updateFormValues = () => {
  Storage.get((storage) => {
    const {
      userMinerSettings,
    } = Settings.fromStoreage(storage);

    // Reset tbody
    document.getElementById('miner-settings-tbody').innerHTML = '';

    userMinerSettings.forEach((config) => {
      addRowWithValues(config);
    });

    if (userMinerSettings.length < 1) {
      addRow();
    }
  });
};

Storage.addonChangedListener(updateFormValues);
document.addEventListener('DOMContentLoaded', updateFormValues);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-miner-button').addEventListener('click', addRow);
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('miner-settings-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const {
      siteKeys,
      userNames,
      cpuUsages,
    } = getMinerSettingsElements();

    const userMinerSettings = [];
    for (let i = 0; i < siteKeys.length; i += 1) {
      userMinerSettings.push({
        siteKey: siteKeys[i].value.trim(),
        userName: userNames[i].value.trim().substring(0, 128),
        cpuUsage: cpuUsages[i].value.trim(),
      });
    }

    Storage.set({
      userMinerSettings,
    }, () => {
      document.getElementById('form-saved-alert').style.display = 'block';
    });
  });
});
