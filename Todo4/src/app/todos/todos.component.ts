import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
  })
export class TodosComponent implements OnInit {
  public todos: Todo[];

  public states = [
    { state: 'all', title: 'All' },
    { state: 'active', title: 'Active' },
    { state: 'completed', title: 'Completed' }
  ];

  public state: string;

  constructor() {}

  ngOnInit() {
    this.todos = [];
    this.state = 'all';
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

  get completedNums() {
    return this.todos.filter(({ completed }) => completed).length;
  }

  get uncompletedNums() {
    return this.todos.filter(({ completed }) => !completed).length;
  }

  get Todos() {
    if (this.state === 'all') return this.todos;
    return this.state === 'active'
      ? this.todos.filter(todo => !todo.completed)
      : this.todos.filter(todo => todo.completed);
  }
}
