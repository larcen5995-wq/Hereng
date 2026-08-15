# 📱 HearEng 안드로이드 APK 앱 생성 및 AdMob 정식 연동 가이드

`http://localhost:8080` (프로젝트 경로: `c:\program1\Arch_eng_runj`) 시스템에 **Google AdMob 전면/배너 광고 및 $5 PRO 결제 시스템**을 100% 탑재 완료하였으며, 안드로이드 **APK 파일(Play Store 출시용)**을 생성하는 공식 2가지 방법입니다.

---

## 💡 1. 탑재된 구글 광고 (AdMob & AdSense) 연동 현황

- **게시자 ID**: `ca-pub-8036094597229084`
- **AdMob 앱 ID**: `ca-app-pub-8036094597229084~5122527799`
- **AdMob 하단 배너 ID**: `ca-app-pub-8036094597229084/8472801201`
- **AdMob 오프닝 전면 광고 ID**: `ca-app-pub-8036094597229084/4759565710`
- **모듈 파일**: `c:\program1\Arch_eng_runj\js\engine\admobEngine.js`
- **$5 PRO 영구 결제 시**: `localStorage.setItem('heareng_pro_unlocked', 'true')`가 설정되어 **모든 광고가 100% 즉시 숨김 처리**됩니다.

---

## 🚀 2. 안드로이드 APK 파일 생성 방법 (방법 A: Capacitor 권장)

Node.js 환경에서 명령 프롬프트를 열고 `c:\program1\Arch_eng_runj` 폴더로 이동 후 아래 명령어를 입력합니다.

### 1단계: 필요 패키지 설치 & 안드로이드 프로젝트 생성
```bash
cd c:\program1\Arch_eng_runj
npm install
npx cap add android
```

### 2단계: 안드로이드 스튜디오 열기
```bash
npx cap open android
```
- 안드로이드 스튜디오가 실행되면 상단 메뉴의 **`Build` ➔ `Build APK(s)`** 또는 **`Generate Signed Bundle / APK`**를 클릭하시면 플레이스토어 제출용 **`.apk` / `.aab`** 파일이 즉시 생성됩니다!

---

## 🌐 3. APK 파일 생성 대체 방법 (방법 B: Bubblewrap TWA)

안드로이드 스튜디오 없이 웹앱을 즉시 Play Store APK로 만드는 구글 공식 툴입니다.

```bash
npx @bubblewrap/cli init --manifest=http://localhost:8080/manifest.json
npx @bubblewrap/cli build
```
- 실행 즉시 `app-release-signed.apk` 파일이 정식 출력됩니다.

---

## 📂 프로젝트 주요 파일 링크

- 📄 [구글 광고 연동 엔진 (Arch_eng_runj/js/engine/admobEngine.js)](file:///c:/program1/Arch_eng_runj/js/engine/admobEngine.js)
- 📄 [메인 앱 (Arch_eng_runj/index.html)](file:///c:/program1/Arch_eng_runj/index.html)
- 📄 [Capacitor 설정 파일 (Arch_eng_runj/capacitor.config.json)](file:///c:/program1/Arch_eng_runj/capacitor.config.json)
- 📄 [AdMob 표준 가이드 (Arch_eng_runj/GOOGLE_ADS_GUIDE.md)](file:///c:/program1/Arch_eng_runj/GOOGLE_ADS_GUIDE.md)
