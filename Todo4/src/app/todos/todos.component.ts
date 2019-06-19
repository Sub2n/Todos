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

  public state: string;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos = this.todosService.Todos;
    this.state = 'all';
  }

  generateID() {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  activeState(acive: string) {
    this.state = acive;
  }

  addTodo(content: string) {
    this.todosService.Todos = [{ id: this.generateID(), content, completed: false }, ...this.todos];
    this.todos = this.todosService.Todos;
  }

  toggleTodo(id: number) {
    this.todosService.Todos = this.todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    this.todos = this.todosService.Todos;
  }

  removeTodo(id: number) {
    this.todosService.Todos = this.todos.filter(todo => todo.id !== id);
    this.todos = this.todosService.Todos;
  }

  completeAll(checked: boolean) {
    this.todosService.Todos = this.todos.map(todo => ({ ...todo, completed: checked }));
    this.todos = this.todosService.Todos;
  }

  removeCompleted() {
    this.todosService.Todos = this.todos.filter(({ completed }) => !completed);
    this.todos = this.todosService.Todos;
  }

  completedNums() {
    return this.todos.filter(({ completed }) => completed).length;
  }

  uncompletedNums() {
    return this.todos.filter(({ completed }) => !completed).length;
  }

  addEvent(input: HTMLInputElement) {
    if (input.value !== '') this.addTodo(input.value.trim());
    input.value = '';
  }

  get Todos() {
    if (this.state === 'all') return this.todos;
    return this.state === 'active'
      ? this.todos.filter(todo => !todo.completed)
      : this.todos.filter(todo => todo.completed);
  }
}
