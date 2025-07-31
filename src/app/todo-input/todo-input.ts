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
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: this.todoService.generateId(),
        text: this.newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      console.log(newTodo);
      this.todoService.addTodo(newTodo);
      this.newTodoText = '';
    }
  }
  onSortChange(event: any): void {
    const sortType = event.target.value;
    this.todoService.sortTodos(sortType);
    console.log('Current sort:', this.selectedSort);
    console.log('Sort type selected:', sortType);
  }
}
