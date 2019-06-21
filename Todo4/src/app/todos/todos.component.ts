import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo.interface';
import { NavItem } from '../nav-item.type';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
  })
export class TodosComponent implements OnInit {
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

  completeAll(checked: boolean) {
    this.todos = this.todos.map(todo => ({ ...todo, completed: checked }));
  }

  removeCompleted() {
    this.todos = this.todos.filter(({ completed }) => !completed);
  }

  addEvent(input: HTMLInputElement) {
    if (input.value !== '') this.addTodo(input.value.trim());
    input.value = '';
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
