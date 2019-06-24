import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todos/todo.interface';
import { NavItem } from './todos/nav-item.type';

@Pipe({
  name: 'filter'
  })
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], active: NavItem): any {
    if (active === 'All') return todos;
    return active === 'Active'
      ? todos.filter(todo => !todo.completed)
      : todos.filter(todo => todo.completed);
  }
}
