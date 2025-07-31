import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoHeader } from './todo-header/todo-header';
import { TodoInput } from './todo-input/todo-input';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoHeader, TodoInput, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todolist';
}
