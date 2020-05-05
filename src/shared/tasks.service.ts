import { Injectable } from '@angular/core';
import { TasksViewModel } from '../modules/tasks/view-models/tasks.view-model';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    public Tasks: TasksViewModel[] = [];
    constructor() {}

    public getTasks(): TasksViewModel[] {
        return this.Tasks;
    }

    public getTaskById(id: string): TasksViewModel {
        return this.Tasks.find(task => task.id === id);
    }

    public deleteTaskById(id: string): void {
        this.Tasks = this.Tasks.filter(task => task.id !== id);
    }

    public saveTask(task: TasksViewModel): void {
        this.Tasks.push(task);
    }

    public updateTask(task: TasksViewModel): void {
        const currentTask = this.getTaskById(task.id);

        for (const prop in currentTask) {
            if (task[prop]) {
                currentTask[prop] = task[prop];
            }
        }
    }
}
