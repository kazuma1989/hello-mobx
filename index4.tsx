import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useObserver } from "mobx-react";
import { TodoManager } from "./TodoManager";
import { Todo } from "./Todo";

const manager = new TodoManager();

const singleTodo = new Todo();
singleTodo.title = "single";

function TodoViewer() {
  const [title, finished, toggleFinished] = useObserver(() => [
    singleTodo.title,
    singleTodo.finished,
    () => (singleTodo.finished = !singleTodo.finished)
  ]);

  const [
    todoList,
    toggleFinishedAllNotReactive,
    toggleFinishedAllOKReactive
  ] = useObserver(() => [
    manager.todoList.slice(),
    () => manager.todoList.forEach(todo => (todo.finished = !todo.finished)),
    () =>
      (manager.todoList = manager.todoList.map(todo => {
        todo.finished = !todo.finished;
        return todo;
      }))
  ]);

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
        <div key={id} onClick={toggleFinishedAllNotReactive}>
          {title} {finished && " - DONE!"}
        </div>
      ))}
    </div>
  );
}

function App() {
  return <TodoViewer />;
}

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

ReactDOM.render(<App />, mountPoint);
