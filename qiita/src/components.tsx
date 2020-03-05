import React from 'react'

export function Section({ children }: { children?: React.ReactNode }) {
  return <section>{children}</section>
}

export function Title({ children }: { children?: React.ReactNode }) {
  return <h1>{children}</h1>
}

export function Loading() {
  return <p>Loading...</p>
}

export function Todo({
  label,
  completed,
  onChange,
}: {
  label?: string
  completed?: boolean
  onChange?(): void
}) {
  return (
    <p>
      <label>
        <input type="checkbox" checked={completed} onChange={onChange} />

        {completed && '(DONE!) '}
        {label}
      </label>
    </p>
  )
}
