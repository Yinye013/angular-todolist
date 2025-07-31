import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeader } from './todo-header';

describe('TodoHeader', () => {
  let component: TodoHeader;
  let fixture: ComponentFixture<TodoHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
