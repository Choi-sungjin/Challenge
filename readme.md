# AI 찐친 챌린지

AI 찐친 챌린지 전용 랜딩/작업 페이지입니다.

- 오늘의 챌린지 확인
- 오늘 할 일 체크리스트 작성
- 회고 기록 저장
- 최근 기록 확인
- 매일 챌린지 자동 생성 스크립트 (GitHub Actions용)

## 실행

```bash
npm install
npm run dev
```

## 파일 구성

- `app/page.tsx` : 챌린지 대시보드 화면
- `app/components/ChallengeBoard.tsx` : 오늘 작업 보드(클라이언트)
- `public/challenges.json` : 날짜별 챌린지 데이터
- `scripts/generate-challenge.js` : 매일 1개 생성
- `.github/workflows/daily-challenge.yml` : GitHub Action 스케줄(매일 KST 00:00)

## 수동으로 과거 채움

```bash
npm run generate:backfill
```
