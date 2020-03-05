import React, { useEffect } from 'react'
import { Section, Title, Loading, Todo } from './components'
import TodosStore from './TodosStore'

const store = new TodosStore()

export default function App() {
  // store の todos や loading の値が変化したことをコンポーネントは検知できない。
  const { todos, loading, toggle, fetch: fetchTodos } = store

  // そのため API から TODO 一覧を取得しても、
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  // ずっと読み込み中表示のまま。
  if (loading) {
    return (
      <Section>
        <Loading />
      </Section>
    )
  }

  // ここには至らない。
  return (
    <Section>
      <Title>Todos</Title>

      {todos.map(({ id, title, completed }) => (
        <Todo
          key={id}
          label={title}
          completed={completed}
          onChange={() => toggle(id)}
        />
      ))}
    </Section>
  )
}
