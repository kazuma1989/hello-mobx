import { observable, computed, action, flow } from 'mobx'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

/**
 * TODO 一覧を管理する store
 */
export default class TodosStore {
  /**
   * TODO 一覧
   */
  @observable todos: Todo[]

  /**
   * TODO 一覧を読み込み中のとき true
   */
  @computed get loading() {
    return !this.todos
  }

  /**
   * TODO の一つの完了／未完了を切り替える
   *
   * @param id 対象の TODO の ID
   */
  @action.bound toggle(id: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  /**
   * TODO 一覧を API から取得する
   */
  fetch = flow(function*(this: TodosStore) {
    this.todos = yield fetch(
      'https://jsonplaceholder.typicode.com/todos?userId=1',
    ).then(r => r.json())
  }).bind(this)
}
