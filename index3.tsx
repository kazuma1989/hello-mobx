import React, { useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useObserver } from "mobx-react";
import { Todo } from "./Todo";

// -----
// hooks/useMobxStore.ts
// -----
// Inspired from https://blog.mselee.com/posts/2019/06/08/using-mobx-with-react-hooks-typescript/

export type Selector<Store, Selection> = (store: Store) => Selection;

export function useMobxStore<Store, Selection>(
  context: React.Context<Store>,
  selector: Selector<Store, Selection>
) {
  const store = useContext(context);
  if (!store) {
    throw new Error("need to pass a value to the context");
  }

  return useObserver(() => selector(store));
}

// -----
// stores/Todo.ts
// -----

// export class Todo {}

// Define Todo store as a class
// and also define useXxxStore
const context = createContext<Todo | null>(null);

export const TodoProvider = context.Provider;

export function useTodo<S>(selector: Selector<Todo, S>) {
  return useMobxStore(context, selector);
}

// -----
// components/TodoViewer.tsx
// -----

function TodoViewer() {
  const [title, finished, toggleFinished, setTitle] = useTodo(store => [
    store.title,
    store.finished,
    () => (store.finished = !store.finished),
    (title: string) => (store.title = title)
  ]);

  useEffect(() => {
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      setTitle(`${title} ${i}`);
    }, 1000);

    return function stop() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div onClick={toggleFinished}>
      {title}
      {finished && " - DONE!"}
    </div>
  );
}

// -----
// main.tsx
// -----

// Then bootstrap your app
const todo = new Todo();
todo.title = "Do something";

function App() {
  return (
    <TodoProvider value={todo}>
      <TodoViewer />
    </TodoProvider>
  );
}

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

ReactDOM.render(<App />, mountPoint);
