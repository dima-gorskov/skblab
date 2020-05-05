import { Component, OnInit } from '@angular/core';
import { TaskViewModel } from '../../view-models/tasks.view-model';
import { TaskService } from 'src/app/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../interface/task.interface';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
    public task: TaskViewModel;
    public loading = true;
    public editMode: boolean;
    public titleControl: FormControl = new FormControl();
    public descriptionControl: FormControl = new FormControl();
    public dateControl: FormControl = new FormControl();
    public statusControl: FormControl = new FormControl();

    public statusOptions = [
        { value: 'open', title: 'Открыто' },
        { value: 'done', title: 'Закрыто' }
    ];

    private id: number;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        const { id } = this.route.snapshot.params;
        this.id = +id;
        this.editMode = !!this.id;
        if (this.id) {
            this.taskService.getTaskById(id).subscribe((res) => {
                this.task = new TaskViewModel(res);

                this.titleControl.setValue(this.task.title, { emitEvent: false });
                this.descriptionControl.setValue(this.task.description, { emitEvent: false });
                this.dateControl.setValue(this.task.expDate, { emitEvent: false });
                this.statusControl.setValue(this.task.status, { emitEvent: false });
                this.loading = false;
            });
        } else {
            this.loading = false;
        }
    }

    public submit() {
        const data = {
            id: this.id,
            title: this.titleControl.value,
            description: this.descriptionControl.value,
            expDate: this.dateControl.value
        } as TaskViewModel;

        this.editMode ?
            this.taskService.updateTask(data).subscribe(res => {
                console.log(res);
                this.redirectToDashboard();
            }) :
            this.taskService.createTask(data).subscribe(res => {
                console.log(res);
                this.redirectToDashboard();
            });
    }

    private redirectToDashboard() {
        this.router.navigate(['/dashboard']);
    }
}
