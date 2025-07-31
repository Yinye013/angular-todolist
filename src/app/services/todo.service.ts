import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  private todos: Todo[] = JSON.parse(
    localStorage.getItem(this.STORAGE_KEY) || '[]'
  );

  private todosSubject = new Subject<Todo[]>();
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() {}

  generateId(): number {
    return this.todos?.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id)) + 1
      : 1;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
    console.log(this);
    console.log(this.todos);
    console.log(this.todos$);
    console.log(this.todosSubject);
    console.log(this.todosSubject.next);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.todosSubject.next(this.todos);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  emitTodos() {
    this.todosSubject.next(this.todos);
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosSubject.next(this.todos);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    }
  }

  updateTodo(id: number, updatedTodo: Partial<Todo>) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      this.todos[todoIndex] = {
        ...this.todos[todoIndex],
        ...updatedTodo,
      };
      this.todosSubject.next([...this.todos]); //I spread it out to create a new array reference, to avoid mutating the original array

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    }
  }

  sortTodos(sortType: string): void {
    const sortedTodos = [...this.todos];
    switch (sortType) {
      case 'completed':
        sortedTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;
      case 'incomplete':
        sortedTodos.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
      case 'newest':
        sortedTodos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        sortedTodos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        console.warn('Unknown sort type:', sortType);
    }
    this.todos = sortedTodos;
    this.todosSubject.next([...this.todos]);
  }
}
