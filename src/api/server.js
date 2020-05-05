const express = require("express");
const app = express();

const taskRouter = require("./tasks.router");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/tasks', taskRouter);

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
