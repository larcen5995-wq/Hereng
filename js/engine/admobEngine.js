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

    // Platform Detection (Android vs iOS)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Production Credentials
    this.prodPubId = 'ca-pub-8036094597229084';
    this.prodAppId = isIOS ? 'ca-app-pub-8036094597229084~9200530680' : 'ca-app-pub-8036094597229084~5122527799';
    this.prodBannerSlot = isIOS ? '2687093227' : '8472801201';
    this.prodInterstitialSlot = isIOS ? '6828734393' : '4759565710';

    // Google Test Ad Credentials
    this.testPubId = 'ca-pub-3940256099942544';
    this.testBannerSlot = '6300978111';
    this.testInterstitialSlot = '1033173712';

    // Active IDs based on Mode
    this.pubId = this.isTestMode ? this.testPubId : this.prodPubId;
    this.bannerSlot = this.isTestMode ? this.testBannerSlot : this.prodBannerSlot;
    this.interstitialSlot = this.isTestMode ? this.testInterstitialSlot : this.prodInterstitialSlot;

    // Check if user has purchased $5 PRO Lifetime License (No Ads)
    this.isProUnlocked = localStorage.getItem('heareng_pro_unlocked') === 'true'; // FREE AD-SUPPORTED VERSION BY DEFAULT!

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

  triggerDailyAdMent(mentText, forceDevTest = false) {
    this.refreshAdMobImpression();
    if (this.isProUnlocked && !forceDevTest) return;

    // Suppress modal popups when screen is OFF/backgrounded
    if (document.visibilityState === 'hidden' && !forceDevTest) {
      console.log('🛡️ [AdMob Safety] Screen is OFF. Skipping daily ad popup.');
      return;
    }
    
    if (window.ttsEngine && window.ttsEngine.speakText) {
      window.ttsEngine.speakText(mentText, 'ko-KR', () => {
        this.showInterstitialAd();
      });
    } else {
      this.showInterstitialAd();
    }
  }

  triggerRadioCmAd(forceDevTest = false) {
    this.refreshAdMobImpression();
    if (this.isProUnlocked && !forceDevTest) return;

    // 🛡️ Background / Lockscreen Safety:
    // When listening with screen OFF, do NOT pop ads or loud sounds. Play gentle continuous playback notification.
    if (document.visibilityState === 'hidden' && !forceDevTest) {
      console.log('🛡️ [AdMob Safety] Screen is OFF during sleep/background playback. Suppressing AdMob popups.');
      if (window.ttsEngine && window.ttsEngine.speakText) {
        window.ttsEngine.speakText('HearEng 단어장 연속 낭독 중입니다.', 'ko-KR');
      }
      return;
    }
    
    if (window.ttsEngine && window.ttsEngine.speakText) {
      window.ttsEngine.speakText('잠시 후 협찬 라디오 광고를 전해드립니다.', 'ko-KR', () => {
        this.showInterstitialAd();
      });
    } else {
      this.showInterstitialAd();
    }
  }

  checkDailyAdOnStartup() {
    if (this.isProUnlocked) return;
    const now = new Date();
    const currentHour = now.getHours();
    const todayStr = now.toISOString().split('T')[0];

    // 1. Daily 7 AM Ad Check (아침 7시 ~ 저녁 7시 사이 앱 켰을 때 오늘 7시 광고 안 봤으면 즉시 팝업)
    const last7Am = localStorage.getItem('last_7am_ad_date');
    if (currentHour >= 7 && currentHour < 19 && last7Am !== todayStr) {
      localStorage.setItem('last_7am_ad_date', todayStr);
      setTimeout(() => {
        this.triggerDailyAdMent("광고 시간입니다. 광고 없는 프로 버전도 있습니다.");
      }, 1500);
      return true;
    }

    // 2. Daily 7 PM Ad Check (저녁 7시 ~ 아침 7시 사이 앱 켰을 때 오늘 7시(19시) 광고 안 봤으면 즉시 팝업)
    const last7Pm = localStorage.getItem('last_7pm_ad_date');
    if ((currentHour >= 19 || currentHour < 7) && last7Pm !== todayStr) {
      localStorage.setItem('last_7pm_ad_date', todayStr);
      setTimeout(() => {
        this.triggerDailyAdMent("광고 시간입니다. 광고 없는 프로 버전도 있습니다.");
      }, 1500);
      return true;
    }
    return false;
  }

  // Trigger Radio CM Sponsored Ad & Daily 7 AM / 7 PM Ads
  startRadioCmTimer() {
    if (this.radioCmInterval) clearInterval(this.radioCmInterval);
    
    // 앱 키자마자 7시 / 19시 광고 체크 즉시 발동
    this.checkDailyAdOnStartup();

    this.radioCmInterval = setInterval(() => {
      if (this.isProUnlocked) return;
      this.listenSeconds += 10;
      
      // 주기적 7시 / 19시 체크
      this.checkDailyAdOnStartup();

      // 3. 45-Minute Regular Radio CM (45분마다 1회)
      if (this.listenSeconds >= 2700) {
        this.listenSeconds = 0;
        this.triggerRadioCmAd();
      }
    }, 10000);
  }

  // Support Native Capacitor / Cordova AdMob Plugin if running in APK
  setupCapacitorNativeAdMob() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
      const { AdMob } = window.Capacitor.Plugins;
      
      try {
        AdMob.addListener('interstitialAdDismissed', () => {
          console.log('Native AdMob Interstitial Dismissed -> Resuming Card Playback');
          this.closeWebAdModalAndResume();
        });
        AdMob.addListener('interstitialAdFailedToLoad', () => {
          console.log('Native AdMob Interstitial Failed -> Resuming Card Playback');
          this.closeWebAdModalAndResume();
        });
      } catch(e){}

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

  showInterstitialAd() {
    if (this.isProUnlocked) return;

    // 🛡️ GOOGLE PLAY & ADMOB POLICY SAFEGUARD:
    // Never trigger AdMob Interstitial Ads when the screen is OFF or app is backgrounded (sleep mode)!
    if (document.visibilityState === 'hidden') {
      console.log('🛡️ [AdMob Safeguard] App is backgrounded or screen is OFF. Suppressing AdMob Interstitial to comply with Google Play Policy.');
      return;
    }

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
    const dailyModal = document.getElementById('daily7amRadioAdModal') || document.getElementById('dailyAdModal') || document.getElementById('adModal');
    if (dailyModal) {
      dailyModal.classList.add('active');
      
      // Auto-close modal and resume card reading after 3.5 seconds
      if (this.autoCloseTimer) clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = setTimeout(() => {
        this.closeWebAdModalAndResume();
      }, 3500);
    }
  }

  closeWebAdModalAndResume() {
    if (this.autoCloseTimer) clearTimeout(this.autoCloseTimer);
    
    const modals = [
      document.getElementById('daily7amRadioAdModal'),
      document.getElementById('dailyAdModal'),
      document.getElementById('adModal')
    ];
    modals.forEach(m => {
      if (m) m.classList.remove('active');
    });

    // Auto-resume reading current card for BOTH Android Native & Web
    if (window.ttsEngine) {
      window.ttsEngine.isPlaying = true;
      setTimeout(() => {
        window.ttsEngine.play();
      }, 300);
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

    const tab1SponsorAdBox = document.getElementById('tab1SponsorAdBox');
    if (tab1SponsorAdBox) tab1SponsorAdBox.style.display = 'none';

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
      window.Capacitor.Plugins.AdMob.hideBanner().catch(() => {});
    }
  }
}

window.adMobEngine = new AdMobEngine();
