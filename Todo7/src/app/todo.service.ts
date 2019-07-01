import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Todo } from './todos/todo.interface';

@Injectable({
  providedIn: 'root'
  })
export class TodoService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  add(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(this.apiUrl, todo);
  }

  toggle(id: number, completed: boolean): Observable<Todo[]> {
    return this.http.patch<Todo[]>(`${this.apiUrl}/${id}`, { completed });
  }

  remove(id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>(`${this.apiUrl}/${id}`);
  }

  completeAll(completed: boolean): Observable<Todo[]> {
    return this.http.patch<Todo[]>(this.apiUrl, { completed });
  }

  removeCompleted(): Observable<Todo[]> {
    return this.http.delete<Todo[]>(`${this.apiUrl}/completed`);
  }
}
