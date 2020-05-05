import { ITask } from '../interface/task.interface';
import * as moment from 'moment';

export class TaskViewModel {
    public id?: number;
    public title: string;
    public description: string;
    public expDate: Date;
    public status?: 'open' | 'done' = 'open';
    public warning?: string;

    constructor(data: ITask) {
        for (const props in data) {
            if (data[props] !== undefined) {
                this[props] = data[props];

                if (props === 'expDate') {
                    this.warning = this.setWarning(data[props]);
                }
            }
        }
    }

    private setWarning(date: Date = new Date()) {
        const currentDate = new Date();
        const diff = moment(date).diff(currentDate, 'days');

        if (diff < 0) {
            return 'alert';
        } else if (diff >= 0 && diff <= 3) {
            return 'attention';
        } else {
            return 'normal';
        }
    }
}
