const moment = require('moment');
class TaskModel {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.expDate = data.expDate;
        this.warning = this.setWarning(data.expDate);
    }

    setWarning(date = new Date()) {
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

module.exports = TaskModel;
