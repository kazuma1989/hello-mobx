import React from "react";
import ReactDOM from "react-dom";
import { observable, runInAction, flow } from "mobx";
import { observer } from "mobx-react";

class ExampleStore {
  @observable
  message = "";

  changeMessage = flow(this._changeMessage);
  private *_changeMessage() {
    this.message = "Good morning";

    yield new Promise(resolve => {
      setTimeout(() => {
        this.message = "Good afternoon";
        resolve();
      }, 1000);
    });

    yield new Promise(resolve => {
      setTimeout(() => {
        this.message = "Good evening";
        resolve();
      }, 1000);
    });
  }
}

const store = new ExampleStore();

const Greetings = observer(function Greetings() {
  React.useEffect(() => {
    store.message = "Good morning";

    setTimeout(() => {
      runInAction(() => {
        store.message = "Good afternoon";

        setTimeout(() => {
          runInAction(() => {
            store.message = "Good evening";
          });
        }, 1000);
      });
    }, 1000);
  }, [store]);

  return <div>{store.message}</div>;
});

const GreetingsWithFlow = observer(function GreetingsWithFlow() {
  React.useEffect(() => {
    store.changeMessage();
  }, [store]);

  return <div>{store.message}</div>;
});

function App() {
  return (
    <div>
      <Greetings />
      <GreetingsWithFlow />
    </div>
  );
}

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

ReactDOM.render(<App />, mountPoint);
