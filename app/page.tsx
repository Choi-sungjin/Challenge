import fs from 'fs'
import path from 'path'
import ChallengeBoard from './components/ChallengeBoard'

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
  const recent = [...challenges].slice(-10).reverse()

  return (
    <main
      style={{
        maxWidth: 920,
        margin: '48px auto',
        padding: '0 16px 56px',
        fontFamily: 'system-ui, sans-serif',
      }}>
      <h1>AI 찐친 챌린지 대시보드</h1>
      <p>참가자가 아니라 내가 직접 만드는 챌린지 페이지로 확장해가는 버전</p>

      <section
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          background: '#fafafa',
        }}>
        <h2>오늘의 챌린지 ({today})</h2>
        {todayChallenge ? (
          <>
            <h3>{todayChallenge.title}</h3>
            <p>{todayChallenge.description}</p>
          </>
        ) : (
          <p>아직 오늘 챌린지가 생성되지 않았습니다.</p>
        )}
      </section>

      <ChallengeBoard defaultDate={today} />

      <h2 style={{ marginTop: 30 }}>최근 챌린지</h2>
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
