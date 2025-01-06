import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getUsers(since: number) {
    return this.http.get(`${this.configService.get('apiBaseURL')}/users?per_page=10&since=${since}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserByUsername(username: string = '') {
    return this.http.get(`${this.configService.get('apiBaseURL')}/users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  getRepositories(username: string, page: number) {
    return this.http.get(`${this.configService.get('apiBaseURL')}/users/${username}/repos?per_page=10&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}