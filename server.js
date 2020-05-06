const express = require("express");
const app = express();
const path = require('path');

const taskRouter = require("./src/api/tasks.router");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/tasks", taskRouter);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/skblab"));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/skblab/index.html"));
});
app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
