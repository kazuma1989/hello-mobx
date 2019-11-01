import React, { useState } from "react";
import ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;
}

const todo = new Todo();

@observer
class TodoViewerClassComp extends React.Component {
  render() {
    return <div>{todo.title}</div>;
  }
}

const TodoViewerFuncComp = observer(function TodoViewerFuncComp() {
  return <div>{todo.title}</div>;
});

function TodoInput() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={e => {
        setText(e.target.value);
        todo.title = e.target.value;
      }}
    />
  );
}

function App() {
  return (
    <div>
      <h1>Hello MobX</h1>

      <TodoInput />
      <TodoViewerClassComp />
      <TodoViewerFuncComp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
