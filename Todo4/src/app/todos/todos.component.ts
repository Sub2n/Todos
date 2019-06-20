import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
  })
export class TodosComponent implements OnInit {
  private _todos: Todo[];

  public states = [{ state: 'All' }, { state: 'Active' }, { state: 'Completed' }];

  public state: string;

  public completedNums: number;

  public uncompletedNums: number;

  constructor() {}

  ngOnInit() {
    this.todos = [];
    this.state = 'All';
    this.completedNums = 0;
    this.uncompletedNums = 0;
  }

  generateID() {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  activeState(acive: string) {
    this.state = acive;
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

  get todos() {
    if (this.state === 'All') return [...this._todos];
    return this.state === 'Active'
      ? this._todos.filter(todo => !todo.completed)
      : this._todos.filter(todo => todo.completed);
  }

  set todos(todos: Todo[]) {
    this._todos = todos;
    this.completedNums = this.todos.filter(({ completed }) => completed).length;
    this.uncompletedNums = this.todos.filter(({ completed }) => !completed).length;
  }
}
