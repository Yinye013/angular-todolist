import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css',
})
export class TodoInput {
  newTodoText: string = '';
  selectedSort: string = 'default';

  constructor(private todoService: TodoService) {}
  addTodo(): void {
    // const tempId = Math.floor(Math.random() * 10000);
    // const optimisticTodo: Todo = {
    //   _id: tempId,
    //   text: this.newTodoText.trim(),
    //   completed: false,
    //   createdAt: new Date(),
    // };

    if (this.newTodoText.trim()) {
      const optimisticTodo: Todo = {
        _id: Date.now().toString(),
        text: this.newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      this.todoService.addOptimisticTodo(optimisticTodo);
      const todoText = this.newTodoText.trim();
      this.newTodoText = '';
      this.todoService.addTodoToBackend(todoText, optimisticTodo._id);
      console.log('Todo added:', optimisticTodo);
    }
  }
  onSortChange(event: Event): void {
    const sortType = (event?.target as HTMLSelectElement).value;
    this.todoService.sortTodos(sortType);
    console.log('Current sort:', this.selectedSort);
    console.log('Sort type selected:', sortType);
  }
}
