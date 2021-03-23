import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos=null;
  todo=null;
  showAdd=false;
  message='';
  constructor(private todoService:TodoService) { 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  openTodo(todo){
    this.todoService.getTodoData(todo.id).subscribe(
      data => {
        this.todo = data.body;
        //this.todo =data.headers or status 
        //this.todo = data.body.id or title;
      }
    );
  }
  add(){
    this.showAdd=true;
    this.todo={};
    this.message='';
  }
  save(){
    const api= this.todo.id ? this.todoService
    .putTodoData(this.todo): this.todoService.postTodoData(this.todo);
    api.subscribe(
      x=>{
        this.message = !this.todo.id?
        'Todo Created Successfully':
        `Todo ${this.todo.id} saved successfully`;
        this.todo= null;
        this.todos = null;
        this.showAdd= false ;
      }
    );
  }

  delete(){
    this.todoService.deleteTodoData(this.todo.id)
    .subscribe(
      x=>{
        this.message = `Todo ${this.todo.id} Deleted successfully`;
        this.todo= null;
        this.todos = null;
        this.showAdd= false ;
      }
    );
  }
  getData(){
    this.message='';
    this.todoService.getTodos().subscribe(
      data => (this.todos= data),
      error => console.log("Test Error", error));
  }
  back(){
    this.todo = null;
    this.showAdd= false;
    this.todos=null;
  }
}
