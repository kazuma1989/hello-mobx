import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { TodoManager } from "./TodoManager";
import { Todo } from "./Todo";

const manager = new TodoManager();

const singleTodo = new Todo();
singleTodo.title = "single";

const TodoViewer = observer(function TodoViewer() {
  const { title, finished } = singleTodo;
  const toggleFinished = () => (singleTodo.finished = !singleTodo.finished);

  const { todoList } = manager;
  const toggleFinishedAll = () =>
    todoList.forEach(todo => (todo.finished = !todo.finished));

  useEffect(() => {
    manager.loadTodo();
  }, []);

  return (
    <div>
      <div>Single TODO</div>
      <div onClick={toggleFinished}>
        {title} {finished && " - DONE!"}
      </div>

      <div>vs</div>
      <div>TODO list</div>
      {todoList.map(({ id, title, finished }) => (
        <div key={id} onClick={toggleFinishedAll}>
          {title} {finished && " - DONE!"}
        </div>
      ))}
    </div>
  );
});

function App() {
  return <TodoViewer />;
}

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

ReactDOM.render(<App />, mountPoint);
