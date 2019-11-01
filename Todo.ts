import { observable } from "mobx";

export class Todo {
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
