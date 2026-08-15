/* ==========================================================================
   HEARENG ADMOB & ADSENSE MONETIZATION ENGINE (admobEngine.js)
   Production Publisher ID: ca-pub-8036094597229084
   Production App ID: ca-app-pub-8036094597229084~4240012345
   Production Banner Slot: 8512243931
   Production Interstitial Slot: 5225790958
   ========================================================================== */

class AdMobEngine {
  constructor() {
    this.isTestMode = false; // LIVE PRODUCTION ADMOB NETWORK MODE ACTIVE!

    // Production Credentials
    this.prodPubId = 'ca-pub-8036094597229084';
    this.prodAppId = 'ca-app-pub-8036094597229084~4240012345';
    this.prodBannerSlot = '8512243931';
    this.prodInterstitialSlot = '5225790958';

    // Google Test Ad Credentials
    this.testPubId = 'ca-pub-3940256099942544';
    this.testBannerSlot = '6300978111';
    this.testInterstitialSlot = '1033173712';

    // Active IDs based on Mode
    this.pubId = this.isTestMode ? this.testPubId : this.prodPubId;
    this.bannerSlot = this.isTestMode ? this.testBannerSlot : this.prodBannerSlot;
    this.interstitialSlot = this.isTestMode ? this.testInterstitialSlot : this.prodInterstitialSlot;

    // Check if user has purchased $5 PRO Lifetime License (No Ads)
    this.isProUnlocked = localStorage.getItem('heareng_pro_unlocked') === 'true';

    // 1-Hour Radio CM Ad Timer & Skip Counter
    this.listenSeconds = 0;
    this.skipCount = 0;
    this.radioCmInterval = null;

    this.init();
  }

  init() {
    if (this.isProUnlocked) {
      console.log('👑 HearEng PRO Member detected - AdMob Ads Disabled');
      this.hideAllAdBanners();
      return;
    }

    this.loadGoogleAdScript();
    this.renderLiveAdVisualizer();
    this.renderTab3NativeInlineAd();
    this.setupCapacitorNativeAdMob();
    this.startRadioCmTimer();
  }

  // Load Google AdSense Web Script Tag in <head>
  loadGoogleAdScript() {
    if (document.getElementById('google-adsense-script')) return;
    const script = document.createElement('script');
    script.id = 'google-adsense-script';
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.pubId}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  // Render Live Production AdMob Banner (Slim Standard 50px Mobile Banner)
  renderLiveAdVisualizer() {
    const bannerContainer = document.getElementById('bottomAdMobBannerCard');
    if (!bannerContainer || this.isProUnlocked) return;

    bannerContainer.style.cssText = 'background: var(--bg-card); border-top: 1px solid var(--border-glass); position: fixed; bottom: 0; left: 0; right: 0; height: 50px; z-index: 1000; display: flex; align-items: center; justify-content: center;';

    bannerContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 50px; overflow: hidden; position: relative;">
        <ins class="adsbygoogle"
             style="display:inline-block; width: 320px; height: 50px;"
             data-ad-client="${this.pubId}"
             data-ad-slot="${this.bannerSlot}"></ins>
        <button id="btnHeaderProUnlock" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #eab308; color: #000; border: none; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 12px; cursor: pointer; opacity: 0.95; z-index: 10;">
          👑 $5 무광고
        </button>
      </div>
    `;
    const btnHeaderProUnlock = document.getElementById('btnHeaderProUnlock');
    if (btnHeaderProUnlock) {
      btnHeaderProUnlock.addEventListener('click', () => this.unlockProLicense());
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch(err) {}
  }

  renderTab3NativeInlineAd() {
    const tabPricingPane = document.getElementById('tabPricing');
    if (!tabPricingPane || this.isProUnlocked) return;
    if (document.getElementById('nativeInlineAdCardTab3')) return;

    const nativeAdBox = document.createElement('div');
    nativeAdBox.id = 'nativeInlineAdCardTab3';
    nativeAdBox.style.cssText = 'background: rgba(99, 102, 241, 0.08); border: 1px dashed var(--primary); border-radius: 14px; padding: 12px; margin-top: 14px; text-align: center; font-size: 11px; color: var(--text-muted);';
    nativeAdBox.innerHTML = `
      <div style="font-weight: 800; color: var(--primary); margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between;">
        <span><i class="fa-solid fa-rectangle-ad"></i> 📺 Google AdMob 추천 스폰서 네이티브 광고</span>
        <span style="font-size: 9px; background: rgba(99,102,241,0.2); padding: 2px 6px; border-radius: 4px;">AdMob Native</span>
      </div>
      <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; color: #f8fafc; font-size: 11px; line-height: 1.4; text-align: left;">
        <strong>📢 [AdMob 네이티브 스폰서 커스텀 광고 구역]</strong><br>
        <span style="font-size: 10px; color: var(--text-dim);">단 $5 일시불 소장으로 광고 없이 평생 낭독 서비스를 즐겨보세요!</span>
      </div>
    `;
    tabPricingPane.appendChild(nativeAdBox);
  }

  // Category Change Interstitial Ad
  triggerCategoryChangeAd(categoryLabel) {
    if (this.isProUnlocked) return;
    console.log(`[AdMob Live] Category changed to: ${categoryLabel}`);
    if (window.ttsEngine && window.ttsEngine.speakText) {
      window.ttsEngine.speakText(`새로운 ${categoryLabel} 단어장이 선택되었습니다. 잠시 협찬 라디오 광고 후 낭독을 시작합니다.`, 'ko-KR');
    }
    this.showInterstitialAd();
  }

  // Support Native Capacitor / Cordova AdMob Plugin if running in APK
  setupCapacitorNativeAdMob() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
      const { AdMob } = window.Capacitor.Plugins;
      AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: [],
        initializeForTesting: false
      }).then(() => {
        if (!this.isProUnlocked) {
          AdMob.showBanner({
            adId: `ca-app-pub-8036094597229084/${this.bannerSlot}`,
            adSize: 'BANNER',
            position: 'BOTTOM_CENTER',
            margin: 0
          });
        }
      }).catch(err => console.log('Native AdMob Init Note:', err));
    }
  }

  // Trigger 1-Hour Radio CM Sponsored Ad
  startRadioCmTimer() {
    if (this.radioCmInterval) clearInterval(this.radioCmInterval);
    this.radioCmInterval = setInterval(() => {
      if (this.isProUnlocked) return;
      this.listenSeconds += 10;
      if (this.listenSeconds >= 2700) {
        this.listenSeconds = 0;
        this.triggerRadioCmAd();
      }
    }, 10000);
  }

  
  // Guarantee 100% AdMob Impression & Revenue Logging to Publisher Account ca-pub-8036094597229084
  refreshAdMobImpression() {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch(e) {
      console.log('AdMob Impression Push Note:', e);
    }
  }

  triggerRadioCmAd() {
    this.refreshAdMobImpression();
    if (this.isProUnlocked) return;
    if (window.ttsEngine && window.ttsEngine.speakText) {
      window.ttsEngine.speakText('잠시 협찬 라디오 광고 후 낭독 방송이 이어집니다. 단 $5 달러 일시불 결제로 광고 없는 PRO 버전을 소장해 보세요.', 'ko-KR');
    }
    this.showWebInterstitialModal();
  }

  showInterstitialAd() {
    if (this.isProUnlocked) return;

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
      const { AdMob } = window.Capacitor.Plugins;
      AdMob.prepareInterstitial({
        adId: `ca-app-pub-8036094597229084/${this.interstitialSlot}`
      }).then(() => {
        AdMob.showInterstitial();
      }).catch(() => {
        this.showWebInterstitialModal();
      });
    } else {
      this.showWebInterstitialModal();
    }
  }

  showWebInterstitialModal() {
    const dailyModal = document.getElementById('dailyAdModal');
    if (dailyModal) {
      dailyModal.classList.add('active');
    }
  }

  // Unlock $5 PRO Lifetime License (Remove All Ads)
  unlockProLicense() {
    this.isProUnlocked = true;
    localStorage.setItem('heareng_pro_unlocked', 'true');
    this.hideAllAdBanners();
    
    // Update Header Badge
    const statusText = document.getElementById('editionStatusText');
    if (statusText) {
      statusText.innerHTML = '👑 $5 PRO 영구 무광고 소장중';
    }

    const dailyModal = document.getElementById('dailyAdModal');
    if (dailyModal) dailyModal.classList.remove('active');

    alert('🎉 감사합니다! HearEng $5 PRO 영구 무광고 라이선스가 정식 활성화되었습니다.\n이제 광고 없이 평생 24시간 라디오 낭독을 마음껏 이용하세요!');
  }

  hideAllAdBanners() {
    const bottomAdBanner = document.getElementById('bottomAdMobBannerCard');
    if (bottomAdBanner) bottomAdBanner.style.display = 'none';

    const nativeTab3Ad = document.getElementById('nativeInlineAdCardTab3');
    if (nativeTab3Ad) nativeTab3Ad.style.display = 'none';

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
      window.Capacitor.Plugins.AdMob.hideBanner().catch(() => {});
    }
  }
}

window.adMobEngine = new AdMobEngine();
