import { HttpClient, HttpErrorResponse , HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TodoService{
    headers:HttpHeaders;
    constructor(private http:HttpClient){
        this.headers= new HttpHeaders({
            "TagContentType": "application/json",
            Authorization:"my-auth-token"
        });
        this.headers = this.headers.set('Authorization','new auth');
    }
    getTodos(){
        return this.http.get(`https://jsonplaceholder.typicode.com/todos`,
        {headers: this.headers});
        //return this.http.get(`https://jsonplaceholder.typicode.com/todosdummy`);
    }
    getTodoData(todoId:number = 1){
       return this.http.get
       //<{title:string, id:number}>
       (`https://jsonplaceholder.typicode.com/todos/${todoId}`, { observe:'response'}
      // `https://jsonplaceholder.typicode.com/todoscvgnbcvgn/${todoId}`, { observe:'response'}
        )
        //.pipe(catchError( (error1) => console.log(error1) ));
        .pipe(catchError( (error1) => this.handleError(error1) ));
    }
    postTodoData(data:any){
        return this.http.post(`https://jsonplaceholder.typicode.com/todos`,data)
     }
     putTodoData(data:any){
        return this.http.put(
         `https://jsonplaceholder.typicode.com/todos/${data.id}`,data
         );
     }
     deleteTodoData(todoId:any){
        return this.http.get(
         `https://jsonplaceholder.typicode.com/todos/${todoId}`
         );
     }
     private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }

}