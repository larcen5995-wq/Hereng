# 🍏 HearEng 무료 클라우드 맥(Cloud Mac) 아이폰(iOS) 자동 빌드 가이드

이 프로젝트에는 **GitHub Actions 무료 클라우드 맥 컴퓨터(macOS M1/M2/M3)**를 활용하여, Mac 컴퓨터 없이도 **Windows에서 버튼 한 번으로 아이폰 앱(`HearEng_v2.16_iOS_App.ipa`)이 즉시 자동 컴파일**되도록 자동화 스크립트가 세팅되어 있습니다.

---

## 🚀 1. 클라우드 맥 빌드 실행 3단계 방법

### 1단계: GitHub에 소스코드 업로드 (최초 1회)
이 프로젝트 폴더(`c:\program1\Arch_eng_broadcast`)에서 깃(Git)으로 GitHub 개인 저장소(Repository)에 업로드(Push)합니다:

```bash
git init
git add .
git commit -m "HearEng v2.16 iOS Build Setup"
git branch -M main
git remote add origin https://github.com/사용자아이디/HearEng.git
git push -u origin main
```

---

### 2단계: 자동 빌드 시작 (자동 또는 1클릭)
- 코드를 올려두시면 GitHub의 **무료 클라우드 맥(Apple Silicon Mac)**이 수초 만에 켜져서 아이폰 앱 컴파일을 자동으로 시작합니다.
- 또는 GitHub 저장소 웹사이트의 **[Actions]** 탭 ➔ **[🍏 HearEng iOS Cloud Mac Auto Build]** ➔ **[Run workflow]** 버튼을 누르시면 언제든 수동으로 1클릭 빌드가 시작됩니다.

---

### 3단계: 완성된 아이폰 앱(`HearEng_v2.16_iOS_App.ipa`) 다운로드
- 빌드가 완성되면(약 2분 소요), 화면 하단 **Artifacts (결과물)** 구역에 **`HearEng_v2.16_iOS_Build_Artifacts.zip`** 파일이 자동 생성됩니다.
- 다운로드받아 압축을 푸시면 바로 사용할 수 있는 **`HearEng_v2.16_iOS_App.ipa`** 아이폰 앱 파일이 들어있습니다!

---

## 📂 관련 자동화 파일 경로

- 📄 [GitHub Actions 오토 빌드 워크플로우 (.github/workflows/build-ios.yml)](file:///c:/program1/Arch_eng_broadcast/.github/workflows/build-ios.yml)
- 📄 [iOS Xcode 프로젝트 폴더 (ios/App/App.xcworkspace)](file:///c:/program1/Arch_eng_broadcast/ios/App/App.xcworkspace)
