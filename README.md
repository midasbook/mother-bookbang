# 마더책방 랜딩페이지

영등포사회복지관 그림책놀이 활동전문가 동아리에서 시작한 마더책방을 소개하고, 출강 문의를 받을 수 있는 정적 홈페이지입니다.

## 파일 구성

- `index.html`: 랜딩페이지 화면
- `styles.css`: 반응형 디자인
- `app.js`: 최근 활동 카드와 문의 폼 동작
- `apps-script/Code.gs`: Google Sheets Apps Script 문의 저장 API

## 실행

`index.html`을 브라우저로 열면 바로 확인할 수 있습니다. 정적 파일이라 별도 서버 없이 동작합니다.

## Google Sheets 연동

1. Google Sheets에서 새 스프레드시트를 만듭니다.
2. `확장 프로그램 > Apps Script`를 엽니다.
3. `apps-script/Code.gs` 내용을 붙여 넣습니다.
4. `ADMIN_TOKEN` 값을 긴 비밀 문자열로 바꿉니다.
5. `배포 > 새 배포 > 웹 앱`을 선택합니다.
6. 실행 사용자: `나`, 액세스 권한: `모든 사용자`로 배포합니다.
7. 발급된 웹 앱 URL을 `app.js`의 `CONFIG.appsScriptUrl`에 붙여 넣습니다.

연동 전에는 문의 내용이 브라우저 `localStorage`에만 예시 저장됩니다. 연동 후에는 `출강문의` 시트에 자동으로 행이 추가됩니다.

## 콘텐츠 출처

최근 활동 제목, 카테고리, 썸네일은 2026-06-15 기준 네이버 블로그 RSS와 공개 게시글 목록을 참고해 구성했습니다.

- https://blog.naver.com/booknori2025
- https://rss.blog.naver.com/booknori2025.xml
