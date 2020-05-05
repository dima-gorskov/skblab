const TaskModel = require("./task.model");
// const tasksMoch = require('./task.moch')

const tasks = [];

module.exports = {
    retrieveAll() {
        return new Promise((resolve, reject) => {
            resolve(tasks);
        });
    },

    retrieve(id) {
        return new Promise((resolve, reject) => {
            let task = this.getTask(id);
            if (task === null) {
                reject(`Invalid id: ${id}`);
            }
            resolve(task);
        });
    },

    getTask(id) {
        const findedTask = tasks.find((p) => p.id === id);
        return findedTask || null;
    },

    getLastId() {
        const ids = [0];
        if (!tasks.length) {
            return Math.max(...ids);
        }

        tasks.forEach((task) => {
            tasks.push(task.id);
        });
        return Math.max(...ids);
    },

    create(task) {
        return new Promise((resolve, reject) => {
            if (!task) {
                reject("Task not found");
            }
            task.id = this.getLastId() + 1;
            tasks.push(new TaskModel(task));
            resolve(task);
        });
    },

    update(data) {
        return new Promise((resolve, reject) => {
            let task = this.getTask(data.id);
            if (task === null) {
                reject(`Invalid id: ${data.id}`);
            }
            let index = tasks.indexOf(task);
            tasks[index] = new TaskModel(data);
            resolve(task);
        });
    },
};
