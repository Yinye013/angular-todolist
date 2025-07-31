import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  //basically, this is where my "state" lives. i'll define them at the top of the class, above the constructor:
  todos: Todo[] = [];
  private todosSubscription: Subscription = new Subscription();
  isEditModalOpen: boolean = false;
  selectedTodoToBeEdited: string = '';
  currentEditingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {} //i am injecting the todo service here.

  ngOnInit() {
    this.todosSubscription.add(
      this.todoService.todos$.subscribe((todos) => {
        this.todos = todos;
      })
    );

    this.todoService.emitTodos();
  }
  toggleComplete(id: number) {
    this.todoService.toggleComplete(id);
  }

  editTodo(todo: Todo): void {
    this.currentEditingTodo = todo;
    this.selectedTodoToBeEdited = todo.text;
    this.isEditModalOpen = true;
  }

  saveEdit(): void {
    if (this.selectedTodoToBeEdited.trim() && this.currentEditingTodo) {
      this.todoService.updateTodo(this.currentEditingTodo.id, {
        text: this.selectedTodoToBeEdited.trim(),
      });
    }
    this.isEditModalOpen = false;
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.currentEditingTodo = null;
    this.selectedTodoToBeEdited = '';
  }

  ngOnDestroy() {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }
}
