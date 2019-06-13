import { Component } from '@angular/core';
import { generate } from 'rxjs';
import { element } from 'protractor';
import { getLocaleFirstDayOfWeek } from '@angular/common';

interface Todo {
  id: number,
  content: string,
  completed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private todos: Array<Todo> = [];
  menu = 'all';

  generateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(elem: HTMLInputElement) {
    this.todos = [{ id: this.generateId(), content: elem.value.trim(), completed: false }, ...this.todos];
    elem.value = '';
  }

  completeTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  completeAllTodos(checked: boolean) {
    this.todos = this.todos.map(todo => {return { ...todo, completed: checked }});
  }

  checkMenu(menu: string) {
    this.menu = menu;
  }

  removeCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // menu가 all, active, completed인지에 따라서 todos를 filter해서 return
  get showTodos() {
    if (this.menu === 'all') return this.todos;
    else {
      return this.menu === 'active' ? this.todos.filter(todo => !todo.completed) : this.todos.filter(todo => todo.completed);
    }
  }

  completedTodos() {
    return this.todos.filter(todo => todo.completed).length;
  }

  uncompletedTodos() {
    return this.todos.length - this.completedTodos();
  }

  get Todos() {
    return this.todos;
  }
}
