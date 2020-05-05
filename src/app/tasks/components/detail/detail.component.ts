import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { TaskViewModel } from '../../view-models/tasks.view-model';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
    public task: TaskViewModel;
    public loading = true;
    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute
    ) {}

    public statusMaping = {
        open: 'Открыто',
        done: 'Закрыто'
    }

    public ngOnInit(): void {
        const { id } = this.route.snapshot.params;

        this.taskService.getTaskById(id).subscribe(res => {
            this.task = new TaskViewModel(res);
            this.loading = false;
        });
    }
}
