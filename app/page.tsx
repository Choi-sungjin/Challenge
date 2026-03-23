import fs from 'fs'
import path from 'path'

type Challenge = {
  date: string
  title: string
  description: string
}

async function getChallenges(): Promise<Challenge[]> {
  const filePath = path.join(process.cwd(), 'public', 'challenges.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  if (!raw.trim()) return []
  return JSON.parse(raw) as Challenge[]
}

export default async function Home() {
  const challenges = await getChallenges()
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
  const todayChallenge = challenges.find((c) => c.date === today)
  const recent = [...challenges].slice(-14).reverse()

  return (
    <main
      style={{
        maxWidth: 760,
        margin: '48px auto',
        padding: '0 16px',
        fontFamily: 'system-ui, sans-serif',
      }}>
      <h1>챌린지 작성하기</h1>
      <p>오늘: {today}</p>

      <section
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}>
        <h2>오늘의 챌린지</h2>
        {todayChallenge ? (
          <>
            <h3>{todayChallenge.title}</h3>
            <p>{todayChallenge.description}</p>
          </>
        ) : (
          <p>아직 오늘 챌린지가 생성되지 않았습니다. 자동 생성은 매일 00:00(KST)입니다.</p>
        )}
      </section>

      <h2>최근 챌린지</h2>
      <ul>
        {recent.map((c) => (
          <li key={c.date} style={{ marginBottom: 12 }}>
            <strong>{c.date}</strong> - {c.title}
            <div style={{ color: '#555' }}>{c.description}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
