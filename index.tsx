import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();

  @observable _title = "";
  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value.toUpperCase();
  }

  @observable finished = false;
}

type Props = {
  todo: Todo;
};

@observer
class TodoViewerClassComp extends React.Component<Props> {
  render() {
    const { todo } = this.props;

    return <div>{todo.title}</div>;
  }
}

const TodoViewerFuncComp = observer(function TodoViewerFuncComp({
  todo
}: Props) {
  return <div>{todo.title}</div>;
});

function TodoInput({ todo }: Props) {
  const [text, setText] = useState("");

  return (
    <input
      autoFocus
      value={text}
      onChange={e => {
        setText(e.target.value);
        todo.title = e.target.value;
      }}
    />
  );
}

function App({ todo }: Props) {
  return (
    <div>
      <h1>Hello MobX</h1>

      <TodoInput todo={todo} />
      <TodoViewerClassComp todo={todo} />
      <TodoViewerFuncComp todo={todo} />
    </div>
  );
}

const { Provider, Consumer } = createContext(new Todo());

ReactDOM.render(
  <Provider value={new Todo()}>
    <Consumer>{todo => <App todo={todo} />}</Consumer>
  </Provider>,
  document.getElementById("app")
);
