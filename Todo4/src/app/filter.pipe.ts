import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.interface';

@Pipe({
  name: 'filter'
  })
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], active: string): any {
    if (active === 'all') return todos;
    return active === 'active'
      ? todos.filter(todo => !todo.completed)
      : todos.filter(todo => todo.completed);
  }
}
