const fs = require('fs')
const path = require('path')

const START_DATE = '2026-03-23'
const DATA_PATH = path.join(__dirname, '..', 'public', 'challenges.json')

const pool = [
  {
    title: '10분 집중 챌린지',
    description: '오늘 할 일 3개 중 우선순위 1개를 먼저 처리한다.'
  },
  {
    title: '물 챌린지',
    description: '물을 500ml 이상 마시고 기록한다.'
  },
  {
    title: '짧은 글 챌린지',
    description: '하루 회고를 3줄로 기록한다.'
  },
  {
    title: '짧은 산책 챌린지',
    description: '15분 이상 걷고 시간을 기록한다.'
  },
  {
    title: '작은 리팩터링 챌린지',
    description: '작은 코드 정리 1건을 수정하고, 변경 요약을 기록한다.'
  }
]

function todayKST() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
}

function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function main() {
  const today = todayKST()
  if (today < START_DATE) {
    console.log(`시작일 이전: ${today}`)
    return
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8') || '[]'
  const arr = JSON.parse(raw)

  if (arr.some((x) => x.date === today)) {
    console.log(`이미 생성된 날: ${today}`)
    return
  }

  const day = parseDate(today).getDate()
  const selected = pool[day % pool.length]

  arr.push({
    date: today,
    title: selected.title,
    description: selected.description
  })

  fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2), 'utf-8')
  console.log('생성 완료', today)
}

main()
