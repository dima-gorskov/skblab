import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskViewModel } from '../../view-models/tasks.view-model';
import { TaskService } from 'src/app/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.less'],
})
export class CreateComponent implements OnInit {
    public task: TaskViewModel;
    public loading = true;
    public isEditMode: boolean;
    public createTaskForm: FormGroup;
    public titleControl: FormControl;
    public descriptionControl: FormControl;
    public dateControl: FormControl;
    public statusControl: FormControl;
    public minDate: Date;
    public statusOptions = [
        { value: 'open', title: 'Открыто' },
        { value: 'done', title: 'Закрыто' }
    ];

    public isValid: boolean = false;

    private id: number;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.initControls();
        const { id } = this.route.snapshot.params;
        this.id = parseFloat(id);
        this.isEditMode = !!this.id;
        if (this.id) {
            this.taskService.getTaskById(id).subscribe((res) => {
                this.task = new TaskViewModel(res);

                this.titleControl.setValue(this.task.title, { emitEvent: false });
                this.descriptionControl.setValue(this.task.description, { emitEvent: false });
                this.dateControl.setValue(this.task.expDate, { emitEvent: false });
                this.statusControl.setValue(this.task.status, { emitEvent: false });
                this.loading = false;
                this.setValid();
            });
        } else {
            this.statusControl.setValue(this.statusOptions[0].value, { emitEvent: false });
            this.loading = false;
        }
    }

    public submit() {
        if (!this.isValid) {
            return;
        }
        const data = {
            id: this.id,
            title: this.titleControl.value,
            description: this.descriptionControl.value,
            expDate: this.dateControl.value,
            status: this.statusControl.value
        } as TaskViewModel;

        this.isEditMode ?
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

    private initControls() {
        this.titleControl = new FormControl('', [Validators.required]);
        this.descriptionControl = new FormControl('', [Validators.required]);
        this.dateControl = new FormControl(new Date(), [Validators.required]);
        this.statusControl = new FormControl(this.statusOptions[0], [Validators.required]);
        this.createTaskForm = new FormGroup({
            title: this.titleControl,
            description: this.descriptionControl,
            date: this.dateControl,
            status: this.statusControl
        });

        this.createTaskForm.valueChanges.subscribe(value => {
            this.setValid();
        });
    }

    private setValid() {
        this.isValid = this.titleControl.valid &&
            this.descriptionControl.valid &&
            this.dateControl.valid &&
            this.statusControl.valid;
    }
}
