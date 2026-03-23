'use client'

import { FormEvent, useEffect, useState } from 'react'

type Todo = {
  title: string
  done: boolean
}

const STORAGE_PREFIX = 'aichallenge-v1'

export default function ChallengeBoard({ defaultDate }: { defaultDate: string }) {
  const [note, setNote] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    { title: '오늘 계획 1개 정리', done: false },
    { title: '실행 로그 한 줄 작성', done: false },
    { title: '챌린지 결과를 1분 요약', done: false },
  ])

  const storageKey = `${STORAGE_PREFIX}-${defaultDate}`

  useEffect(() => {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { note: string; todos: Todo[] }
      setNote(parsed.note ?? '')
      setTodos(Array.isArray(parsed.todos) && parsed.todos.length ? parsed.todos : todos)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ note, todos }))
  }, [note, todos])

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const title = String(fd.get('title') ?? '').trim()
    if (!title) return
    setTodos((prev) => [...prev, { title, done: false }])
    e.currentTarget.reset()
  }

  const toggle = (idx: number) => {
    setTodos((prev) => prev.map((it, i) => (i === idx ? { ...it, done: !it.done } : it)))
  }

  const remove = (idx: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== idx))
  }

  const clearDone = () => {
    setTodos((prev) => prev.filter((it) => !it.done))
  }

  return (
    <section
      style={{
        marginTop: 18,
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 12,
      }}>
      <h2>오늘 작업 보드</h2>
      <p>네가 직접 수정하고 관리할 수 있는 챌린지 작업장</p>

      <label style={{ display: 'block', marginBottom: 10 }} htmlFor="note">
        오늘 회고
      </label>
      <textarea
        id="note"
        style={{ width: '100%', minHeight: 90, marginBottom: 12, padding: 8 }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="예: 오늘은 계획 대비 70% 진행, 다음은 리스크 완화 집중"
      />

      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          name="title"
          placeholder="할 일 추가"
          style={{ flex: 1, padding: 8 }}
          required
        />
        <button type="submit">추가</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map((t, idx) => (
          <li key={`${t.title}-${idx}`} style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={() => toggle(idx)}>
              {t.done ? '✅' : '⬜'}
            </button>
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', flex: 1 }}>{t.title}</span>
            <button type="button" onClick={() => remove(idx)}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button type="button" onClick={clearDone}>
          완료된 항목 삭제
        </button>
      </div>
    </section>
  )
}
