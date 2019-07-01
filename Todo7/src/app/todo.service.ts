import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Todo } from './todos/todo.interface';

@Injectable({
  providedIn: 'root'
  })
export class TodoService {
  private todos: Todo[];

  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.apiUrl, todo);
  }

  toggleTodo(id: number, completed: boolean): Observable<Todo[]> {
    return this.http.patch<Todo[]>(`${this.apiUrl}/${id}`, { completed });
  }

  removeTodo(id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>(`${this.apiUrl}/${id}`);
  }

  completeAllTodos(completed: boolean): Observable<Todo[]> {
    return this.http.patch<Todo[]>(this.apiUrl, { completed });
  }

  removeCompletedTodos(): Observable<Todo[]> {
    return this.http.delete<Todo[]>(`${this.apiUrl}/completed`);
  }
}
