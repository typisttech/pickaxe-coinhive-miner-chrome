/* global chrome:true */

const iconPaths = Object.freeze({
  16: 'icons/icon16.png',
  32: 'icons/icon32.png',
  48: 'icons/icon48.png',
  128: 'icons/icon128.png',
});

const grayscaleIconPaths = Object.freeze({
  16: 'icons/icon16-grayscale.png',
  32: 'icons/icon32-grayscale.png',
  48: 'icons/icon48-grayscale.png',
  128: 'icons/icon128-grayscale.png',
});

class Badge {
  static updateIcon(isRunning) {
    if (isRunning) {
      this.showColoredIcon();
    } else {
      this.showGrayscaleIcon();
    }
  }

  static showGrayscaleIcon() {
    chrome.browserAction.setIcon({
      path: grayscaleIconPaths,
    });
  }

  static showColoredIcon() {
    chrome.browserAction.setIcon({
      path: iconPaths,
    });
  }

  static updateText(hashRate) {
    let text = String(hashRate);

    if (hashRate > 9999) {
      text = '>10k';
    } else if (hashRate < 1) {
      text = '';
    }

    chrome.browserAction.setBadgeText({
      text,
    });
  }
}

export default Badge;
