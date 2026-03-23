# AI 찐친 챌린지 - 챌린지 작성하기

- 챌린지 페이지: Next.js
- 매일 1개 챌린지 자동 생성
- GitHub Actions + Vercel 배포 준비 완료

## 실행

```bash
npm install
npm run dev
```

## 파일 구성
- `public/challenges.json` : 날짜별 챌린지 데이터
- `scripts/generate-challenge.js` : 매일 1개 생성
- `.github/workflows/daily-challenge.yml` : GitHub Action 스케줄(매일 KST 00:00)

## 수동으로 과거 채움
```bash
npm run generate:backfill
```
