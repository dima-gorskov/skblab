import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ITask } from './tasks/interface/task.interface';
import { TaskViewModel } from './tasks/view-models/tasks.view-model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = 'api/tasks'; // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8;' })
    };

    constructor(private http: HttpClient) {}

    /**
     * Получение списка задач
     */
    public getAllTasks(): Observable<TaskViewModel[]> {
        return this.http
            .get<TaskViewModel[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<TaskViewModel[]>('getTasks', []))
            );
    }

    /**
     * Получение задачи по id;
     * @param id - {number} id задачи
     */
    public getTaskById(id: number): Observable<TaskViewModel> {
        return this.http
            .get<TaskViewModel>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError<TaskViewModel>('getTaskById')));
    }

    /**
     * Обновление задачи
     */
    public updateTask(
        model: any
    ): Observable<TaskViewModel> {
        return this.http
            .put<TaskViewModel>(`${this.apiUrl}`, new TaskViewModel(model))
            .pipe(catchError(this.handleError));
    }

    /**
     * Создание задачи
     */
    public createTask(
        model: TaskViewModel
    ): Observable<TaskViewModel> {
        return this.http
            .post<TaskViewModel>(`${this.apiUrl}`, new TaskViewModel(model))
            .pipe(catchError(this.handleError));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}
