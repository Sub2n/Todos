import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.interface';
import { NavItem } from './nav-item.type';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">7.0</div>
      <app-todo-form (add)="addTodo($event)"></app-todo-form>

      <app-todo-nav (active)="activeState($event)" [navState]="navState"></app-todo-nav>

      <app-todo-list
        [todos]="todos"
        [navState]="navState"
        (toggle)="toggleTodo($event)"
        (remove)="removeTodo($event)"
      ></app-todo-list>

      <app-todo-footer
        [completedNums]="completedNums"
        [uncompletedNums]="uncompletedNums"
        [allCompleted]="allCompleted"
        (completeAll)="completeAllTodos($event)"
        (removeCompleted)="removeCompletedTodos($event)"
      ></app-todo-footer>
      <pre>{{ todos | json }}</pre>
    </div>
  `,
  styles: [
  `
      .container {
        max-width: 750px;
        min-width: 450px;
        margin: 0 auto;
        padding: 15px;
      }

      .title {
        /* margin: 10px 0; */
        font-size: 4.5em;
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
      }

      .ver {
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
        margin-bottom: 30px;
      }
    `
  ]
  })
export class TodoContainerComponent implements OnInit {
  private _todos: Todo[];

  public navState: NavItem;

  public completedNums: number;

  public uncompletedNums: number;

  public allCompleted: boolean;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
    this.navState = 'All';
    this.completedNums = 0;
    this.uncompletedNums = 0;
  }

  getTodos() {
    this.todoService.get().subscribe(todos => (this.todos = todos));
  }

  generateID() {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  activeState(activeState: NavItem) {
    this.navState = activeState;
  }

  addTodo(content: string) {
    const todo = {
      id: this.generateID(),
      content,
      completed: false
    };
    this.todoService.add(todo).subscribe(todos => (this.todos = todos));
  }

  toggleTodo(id: number) {
    const completed = !this.todos.find(todo => todo.id === id).completed;
    this.todoService.toggle(id, completed).subscribe(todos => (this.todos = todos));
  }

  removeTodo(id: number) {
    this.todoService.remove(id).subscribe(todos => (this.todos = todos));
  }

  completeAllTodos(checked: boolean) {
    this.todoService.completeAll(checked).subscribe(todos => (this.todos = todos));
  }

  removeCompletedTodos() {
    this.todoService.removeCompleted().subscribe(todos => (this.todos = todos));
  }

  get todos(): Todo[] {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    this._todos = todos;
    this.allCompleted = this._todos.every(({ completed }) => completed);
    this.completedNums = this._todos.filter(({ completed }) => completed).length;
    this.uncompletedNums = this._todos.filter(({ completed }) => !completed).length;
  }
}
