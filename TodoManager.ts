import { observable, action } from "mobx";
import { Todo } from "./Todo";

export class TodoManager {
  @observable.deep todoList: Todo[] = [];

  @action
  loadTodo() {
    const todo = new Todo();
    todo.title = "hello";

    this.todoList = [todo];
  }

  @action.bound
  toggleFinishedAll() {
    this.todoList.forEach(todo => (todo.finished = !todo.finished));
  }
}
