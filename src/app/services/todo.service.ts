import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = `${environment.apiUrl}/api/v1/todos`;
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.http
      .get<any>(this.API_URL)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (response: any) => {
          this.todosSubject.next(response.data);
          console.log('Todos loaded:', response.data);
        },
        error: (error) => {
          console.error('Error loading todos:', error);
        },
      });
  }

  getTodos(): Observable<any> {
    return this.http.get<any>(this.API_URL).pipe(catchError(this.handleError));
  }

  addOptimisticTodo(optimisticTodo: Todo): void {
    const currentTodos = this.todosSubject.value;
    const optimisticTodos = [...currentTodos, optimisticTodo];
    this.todosSubject.next(optimisticTodos);
  }

  addTodoToBackend(text: string, tempId: string): void {
    const todoData = {
      text: text,
      completed: false,
    };

    this.http
      .post<any>(this.API_URL, todoData)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (response: any) => {
          console.log('Real todo from backend:', response.data);
          const currentTodos = this.todosSubject.value;
          const updatedTodos = currentTodos.map((todo) =>
            todo._id === tempId ? response.data : todo
          );
          this.todosSubject.next(updatedTodos);
        },
        error: (error) => {
          console.error('Error adding todo to backend:', error);
          const currentTodos = this.todosSubject.value;
          const filteredTodos = currentTodos.filter(
            (todo) => todo._id !== tempId
          );
          this.todosSubject.next(filteredTodos);
        },
      });
  }

  updateTodo(id: string, updates: Partial<Todo>) {
    this.http
      .put<any>(`${this.API_URL}/${id}`, updates)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (response: any) => {
          console.log('Updated todo:', response.data);

          // Use local state instead of API call
          const currentTodos = this.todosSubject.value;
          const index = currentTodos.findIndex((todo) => todo._id === id);
          if (index !== -1) {
            const updatedTodos = [...currentTodos];
            updatedTodos[index] = response.data;
            this.todosSubject.next(updatedTodos);
          }
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
  }

  deleteTodo(id: string) {
    this.http
      .delete(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: () => {
          console.log(`Todo with id ${id} deleted`);

          // Use local state instead of API call
          const currentTodos = this.todosSubject.value;
          const filteredTodos = currentTodos.filter((todo) => todo._id !== id);
          this.todosSubject.next(filteredTodos);
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
        },
      });
  }

  toggleComplete(id: string): void {
    const currentTodos = this.todosSubject.value;
    const todo = currentTodos.find((todo) => todo._id === id);

    if (todo) {
      // Update UI immediately (optimistic)
      const updatedTodos = currentTodos.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      );
      this.todosSubject.next(updatedTodos);

      this.updateTodo(id, { completed: !todo.completed });
    }
  }

  sortTodos(sortType: string): void {
    const currentTodos = [...this.todosSubject.value];

    switch (sortType) {
      case 'completed':
        currentTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;
      case 'incomplete':
        currentTodos.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
      case 'newest':
        currentTodos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        currentTodos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        console.warn('Unknown sort type:', sortType);
        return;
    }

    this.todosSubject.next(currentTodos);
  }

  emitTodos() {
    this.loadTodos();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
