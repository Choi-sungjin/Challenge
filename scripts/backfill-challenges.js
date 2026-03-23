const fs = require('fs')
const path = require('path')

const START_DATE = '2026-03-23'
const DATA_PATH = path.join(__dirname, '..', 'public', 'challenges.json')

const pool = [
  {
    title: '10분 정리 챌린지',
    description: '할 일 3개를 적고 우선순위 순으로 1개만 먼저 실행한다.'
  },
  {
    title: '물 마시기 챌린지',
    description: '물을 500ml 이상 마시고 기록한다.'
  },
  {
    title: '짧은 일기 챌린지',
    description: '오늘 하루를 3줄로 기록한다.'
  },
  {
    title: '짧은 산책 챌린지',
    description: '15분 이상 걸었다고 기록한다.'
  },
  {
    title: '정리 정돈 챌린지',
    description: '작은 폴더 1개를 정리하고 정리 전후를 메모한다.'
  }
]

const parseDate = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const addDays = (date, days) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

const main = () => {
  const end = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
  const raw = fs.readFileSync(DATA_PATH, 'utf-8') || '[]'
  const arr = JSON.parse(raw)
  const byDate = new Set(arr.map((i) => i.date))

  let cur = START_DATE
  while (cur <= end) {
    if (!byDate.has(cur)) {
      const day = parseDate(cur).getDate()
      const selected = pool[day % pool.length]
      arr.push({
        date: cur,
        title: selected.title,
        description: selected.description
      })
      byDate.add(cur)
    }
    cur = addDays(parseDate(cur), 1)
  }

  arr.sort((a, b) => (a.date < b.date ? -1 : 1))
  fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2), 'utf-8')
  console.log('백필 완료:', arr.length)
}

main()
