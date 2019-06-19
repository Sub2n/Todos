import { Injectable } from '@angular/core';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
  })
export class TodosService {
  todos: Todo[] = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'JavaScript', completed: false }
  ];

  get Todos() {
    return this.todos;
  }

  set Todos(todos: Todo[]) {
    this.todos = todos;
  }
}
