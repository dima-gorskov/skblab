import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks.service';

import { TaskViewModel } from '../tasks/view-models/tasks.view-model';
import { Observable } from 'rxjs';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../tasks/interface/task.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
    public tasks: TaskViewModel[] = [];
    public doneTasks: TaskViewModel[] = [];
    public allTasks: TaskViewModel[] = [];
    constructor(private taskService: TaskService) {}

    public ngOnInit(): void {
        this.getTasks();
    }

    public drop(event: CdkDragDrop<TaskViewModel[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            this.changeStatusByDropContainer(event);
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    private getTasks(): void {
        this.taskService.getAllTasks().subscribe((tasks) => {
            this.tasks = tasks
                .map((task) => new TaskViewModel(task))
                .filter((task) => task.status === 'open');
            this.doneTasks = tasks
                .map((task) => new TaskViewModel(task))
                .filter((task) => task.status === 'done');
            this.allTasks = [...this.tasks, ...this.doneTasks];
        });
    }

    private changeStatusByDropContainer(event) {
        const moveTask = [...this.tasks, ...this.doneTasks].find(
            (task) =>
                task.id === Number(event.item.element.nativeElement.dataset.id)
        );

        moveTask.status = StatusContainer[event.container.id];

        this.taskService.updateTask(moveTask).subscribe();
    }
}

export enum StatusContainer {
    'ready-container' = 'ready',
    'done-container' = 'done'
}
