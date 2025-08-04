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
  isTodoLoading: boolean = true;

  constructor(private todoService: TodoService) {} //i am injecting the todo service here.

  ngOnInit() {
    console.log('TodoList component initialized');

    this.todosSubscription.add(
      this.todoService.todos$.subscribe({
        next: (todos) => {
          this.todos = todos; //updates when service changes, learnt this the hard way: listen to the service's observable instead of making another API call and fetching data again. This supports the real-time updates(optimistic update I did in the service and input ts)
        },
        error: (error) => {
          console.error('Error fetching todos:', error);
        },
      })
    );

    this.todosSubscription.add(
      this.todoService.loading$.subscribe({
        next: (isLoading) => {
          console.log('Loading state:', isLoading);
          this.isTodoLoading = isLoading; // this will update the loading state, fought with this before I finally got the hang of it
        },
        error: (error) => {
          console.error('Error fetching loading state:', error);
        },
      })
    );
  }

  toggleComplete(id: string) {
    this.todoService.toggleComplete(id);
  }

  editTodo(todo: Todo): void {
    this.currentEditingTodo = todo;
    this.selectedTodoToBeEdited = todo.text;
    this.isEditModalOpen = true;
  }

  saveEdit(): void {
    if (this.selectedTodoToBeEdited.trim() && this.currentEditingTodo) {
      this.todoService.updateTodo(this.currentEditingTodo._id, {
        text: this.selectedTodoToBeEdited.trim(),
      });
    }
    this.isEditModalOpen = false;
  }

  deleteTodo(id: string) {
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
