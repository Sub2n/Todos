import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.interface';
import { NavItem } from './nav-item.type';

@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">4.0</div>
      <app-todo-form (add)="addTodo($event)"></app-todo-form>

      <app-todo-nav
        (state)="activeState($event)"
        [navState]="navState"
        [navItems]="navItems"
      ></app-todo-nav>

      <app-todo-list
        [todos]="todos"
        [navState]="navState"
        (toggle)="toggleTodo($event)"
        (remove)="removeTodo($event)"
      ></app-todo-list>

      <app-todo-footer
        [completedNums]="completedNums"
        [uncompletedNums]="uncompletedNums"
        (completeAll)="completeAllTodos($event)"
        (removeCompleted)="completeAllTodos($event)"
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

  public navItems: NavItem[] = ['All', 'Active', 'Completed'];

  public navState: NavItem;

  public completedNums: number;

  public uncompletedNums: number;

  constructor() {}

  ngOnInit() {
    this.getTodos();
    this.navState = 'All';
    this.completedNums = 0;
    this.uncompletedNums = 0;
  }

  // DB에서 todo list 가져온다고 가정
  getTodos() {
    setTimeout(() => {
      this.todos = [
        { id: 1, content: 'HTML', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 3, content: 'JavaScript', completed: false }
      ];
    }, 3000);
  }

  generateID() {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  activeState(active: NavItem) {
    this.navState = active;
  }

  addTodo(content: string) {
    this.todos = [{ id: this.generateID(), content, completed: false }, ...this.todos];
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  completeAllTodos(checked: boolean) {
    this.todos = this.todos.map(todo => ({ ...todo, completed: checked }));
  }

  removeCompletedTodos() {
    this.todos = this.todos.filter(({ completed }) => !completed);
  }

  get todos(): Todo[] {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    this._todos = todos;
    this.completedNums = this.todos.filter(({ completed }) => completed).length;
    this.uncompletedNums = this.todos.filter(({ completed }) => !completed).length;
  }
}
