/** @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('shaka.test.FakeAdManager');


/**
 * @implements {shaka.extern.IAdManager}
 * @final
 */
shaka.test.FakeAdManager = class extends shaka.util.FakeEventTarget {
  constructor() {
    super();

    /** @private {shaka.ads.AdsStats} */
    this.stats_ = new shaka.ads.AdsStats();
  }

  /** @override */
  setLocale(locale) {}

  /** @override */
  initClientSide(adContainer, video) {}

  /** @override */
  onAssetUnload() {}

  /** @override */
  requestClientSideAds(imaRequest) {
    return Promise.resolve('fake:url');
  }

  /** @override */
  initServerSide(adContainer, video) {}

  /** @override */
  requestServerSideStream(imaRequest, backupUrl = '') {
    return Promise.resolve('fake:url');
  }

  /** @override */
  replaceServerSideAdTagParameters(adTagParameters) {}

  /** @override */
  getStats() {
    return this.stats_;
  }

  /**
   * @override
   */
  onDashTimedMetadata(region) {}

  /**
   * @override
   */
  onHlsTimedMetadata(metadata) {}

  /**
   * @override
   */
  onCueMetadataChange(data) {}

  /**
   * @param {!shaka.test.FakeAd} ad
   */
  startAd(ad) {
    const event = new shaka.util.FakeEvent(shaka.ads.AdManager.AD_STARTED,
        {'ad': ad});

    this.dispatchEvent(event);
  }

  /** @public */
  finishAd() {
    const event = new shaka.util.FakeEvent(shaka.ads.AdManager.AD_STOPPED);
    this.dispatchEvent(event);
  }

  /** @public */
  changeSkipState() {
    const event =
        new shaka.util.FakeEvent(shaka.ads.AdManager.AD_SKIP_STATE_CHANGED);
    this.dispatchEvent(event);
  }
};
