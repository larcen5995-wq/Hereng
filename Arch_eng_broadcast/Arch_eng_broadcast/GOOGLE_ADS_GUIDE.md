# 📘 Google AdSense & AdMob 100% 완전무결 연동 표준 가이드
> Project Target: `C:\program1\Arch_eng_runj`  
> Account Credentials: Publisher ID `pub-8036094597229084` / AdMob App ID `ca-app-pub-8036094597229084~4240012345`

---

## 💡 1. 핵심 원칙: 웹(Web)과 앱(Native APK) 100% 역할 분리

구글 광고 시스템은 **웹(AdSense)**과 **모바일 앱(AdMob)**이 명확하게 물리적으로 분리되어 동작합니다.

| 구 분 | 🌐 웹 브라우저 (AdSense) | 📱 모바일 앱 (AdMob / APK) |
| :--- | :--- | :--- |
| **제품 구분** | 구글 웹 애드센스 (AdSense for Content) | 구글 모바일 애드몹 (AdMob for Android) |
| **게시자 ID** | `ca-pub-8036094597229084` | `ca-app-pub-8036094597229084~4240012345` |
| **필수 파일** | 루트 디렉터리 `/public/ads.txt` | 안드로이드 `AndroidManifest.xml` 메타데이터 |
| **광고 단위** | 반응형 웹 디스플레이 태그 | 배너 (`8472801201`) / 전면 (`4759565710`) |
| **상용 승인 조건** | 애드센스 콘솔 도메인 등록 & 승인 | 구글 플레이스토어 등록 후 `[스토어 추가]` |

---

## 🛠️ 2. 코드 탑재 및 연동 표준 절차

### 2-1. `<head>` 스크립트 전역 탑재 (Next.js / HTML 공통)
모든 웹/앱 페이지의 최상단 `<head>`에 아래 공식 구글 애드센스 엔진 스크립트를 탑재합니다.

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8036094597229084" crossorigin="anonymous"></script>
```

### 2-2. 루트 `ads.txt` 파일 설치 (`/public/ads.txt`)
웹 도메인 서버의 최상위 루트 디렉터리에 아래 1줄 코드가 담긴 `ads.txt`를 생성합니다.

```text
google.com, pub-8036094597229084, DIRECT, f08c47fec0942fa0
```

---

## 🚀 3. 사전 테스트 ↔ 정식 출시 2단계 개발 절차

광고 연동 개발 시 절대 헷갈리지 않도록 **2단계 가이드**를 준수합니다:

### 1단계: 사전 검증 (Test Ad 모드)
* **목적**: 출시 전 코드 및 모듈이 정상 동작하는지 구글 테스트 배너로 수신 확인
* **테스트 클라이언트**: `ca-pub-3940256099942544`
* **테스트 슬롯**: `6300978111`
* **속성 파라미터**: `data-adtest="on"`
* **수신 결과**: 구글 상표 및 `Test Ad` 뱃지가 찍힌 공식 모바일/웹 테스트 배너 100% 켜짐

### 2단계: 정식 출시 (Production 상용 모드)
* **목적**: 구글 플레이스토어 / 웹 승인 완료 후 실시간 수익 창출
* **웹 게시자 ID**: `ca-pub-8036094597229084`
* **애드몹 배너 ID**: `ca-app-pub-8036094597229084/8512243931`
* **애드몹 전면 ID**: `ca-app-pub-8036094597229084/5225790958`
* **수신 결과**: 실시간 광고 및 수익 집계 가동

---

## 📦 4. `Arch_eng_runj` 전용 재사용 가능한 광고 컴포넌트 (`GoogleAdBanner.tsx`)

`Arch_eng_runj` 프로젝트 생성 시 그대로 복사해서 사용할 수 있는 100% 안전한 컴포넌트 코드입니다:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface GoogleAdBannerProps {
    slot?: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: boolean;
    style?: React.CSSProperties;
    isTestMode?: boolean; // true일 경우 사전 테스트 배너 수신
}

export default function GoogleAdBanner({
    slot = '8472801201',
    format = 'auto',
    responsive = true,
    style = {},
    isTestMode = false
}: GoogleAdBannerProps) {
    const pushedRef = useRef(false);
    const insRef = useRef<HTMLModElement>(null);
    const [adLoaded, setAdLoaded] = useState(false);

    const clientID = isTestMode ? 'ca-pub-3940256099942544' : 'ca-pub-8036094597229084';
    const slotID = isTestMode ? '6300978111' : slot;

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushedRef.current = true;
        } catch (err) {
            console.error('Google AdSense push error:', err);
        }

        const checkTimer = setTimeout(() => {
            if (insRef.current && insRef.current.clientHeight > 30) {
                setAdLoaded(true);
            }
        }, 800);

        return () => clearTimeout(checkTimer);
    }, []);

    return (
        <div style={{
            margin: '12px auto',
            textAlign: 'center',
            minHeight: '90px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '14px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            padding: '8px',
            ...style
        }}>
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: 'block', minHeight: '90px', width: '100%' }}
                data-ad-client={clientID}
                data-ad-slot={slotID}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
                {...(isTestMode ? { 'data-adtest': 'on' } : {})}
            />
        </div>
    );
}
```

---

## 📌 5. 요약 및 주의사항

1. **절대 혼동 금지**: AdMob 전용 슬롯 ID(`8472801201`)를 웹 애드센스 태그에 넣으면 `unfilled` 오류가 납니다. 웹에는 웹용 디스플레이 슬롯, 앱에는 AdMob 슬롯을 명확히 할당합니다.
2. **Play Store 등록**: APK 앱에서 상용 광고를 켜려면 반드시 Google Play Store 등록 후 AdMob의 `[스토어 추가]`를 눌러 연결해야 합니다.
3. **가이드 문서 보존**: 본 가이드 문서는 `C:\program1\Arch_eng_runj\GOOGLE_ADS_GUIDE.md` 파일에 영구 저장되어 언제든 즉시 참조하여 신규 프로젝트 개발을 진행할 수 있습니다.
