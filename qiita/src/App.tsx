import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { Section, Title, Loading, Todo } from './components'
import TodosStore from './TodosStore'

const store = new TodosStore()

export default function App() {
  const [todos, loading, toggle, fetchTodos] = useObserver(() => [
    store.todos,
    store.loading,
    store.toggle,
    store.fetch,
  ])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return (
      <Section>
        <Loading />
      </Section>
    )
  }

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
