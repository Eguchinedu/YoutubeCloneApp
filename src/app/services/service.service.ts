import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  //Authentication
  login(data: any): Observable<any> {
    return this.http
      .post<any>(environment.baseUrl + 'Auth/login', data)
      .pipe(catchError(this.handleError));
  }
  signUp(data: any): Observable<any> {
    return this.http
      .post<any>(environment.baseUrl + 'Auth/Register', data)
      .pipe(catchError(this.handleError));
  }

  //Users
  getUsers(): Observable<any> {
    return this.http.get(environment.baseUrl + 'User').pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getUserInfo(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + `User/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //Post
  getAllPosts(): Observable<any> {
    return this.http.get(environment.baseUrl + 'User/post').pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getPostofUser(user_id: string, post_id: string): Observable<any> {
    return this.http
      .get(environment.baseUrl + `User/post/${user_id}/${post_id}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  addLike(post_id: string, data: any): Observable<any> {

    return this.http
      .post(environment.baseUrl + `User/post/${post_id}/likes`, data)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  addComment(user_id: string, post_id: string, data: any): Observable<any> {
    console.log(data);
    
    return this.http
      .post(environment.baseUrl + `User/post/${user_id}/${post_id}/Add-comment`, data)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  //HandleErrors

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
