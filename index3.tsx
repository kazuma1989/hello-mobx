import React, { useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { useObserver } from "mobx-react";
import { Todo } from "./Todo";

// -----
// -----
// https://blog.mselee.com/posts/2019/06/08/using-mobx-with-react-hooks-typescript/

function useStoreData<Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  const store = storeSelector(value);
  return useObserver(() => dataSelector(store));
}

function useRootData<Selection>(dataSelector: (store: TStore) => Selection) {
  return useStoreData(storeContext, contextData => contextData!, dataSelector);
}

// -----
// -----

function TodoViewer() {
  const [title, finished, toggleFinished] = useRootData(store => [
    store.title,
    store.finished,
    () => (store.finished = !store.finished)
  ]);

  return (
    <div onClick={toggleFinished}>
      {title}
      {finished && " - DONE!"}
    </div>
  );
}

type TStore = Todo;
const storeContext = createContext<Todo | null>(null);
const { Provider } = storeContext;

const todo = new Todo();
todo.title = "Do something!!!!!!!!";

function App() {
  return (
    <Provider value={todo}>
      <TodoViewer />
    </Provider>
  );
}

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

ReactDOM.render(<App />, mountPoint);
