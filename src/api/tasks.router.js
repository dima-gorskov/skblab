const express = require("express");
const router = express.Router();
const taskService = require("./tasks.service");

router.get("/", async (req, res) => {
    console.log("Retrieving products");
    try {
        let products = await taskService.retrieveAll();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    console.log(`Retrieving product id ${req.params.id}`);
    try {
        let product = await taskService.retrieve(+req.params.id);
        res.json(product);
    } catch (error) {
        console.log(error);
        if (error.indexOf("Invalid id") > -1) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const task = await taskService.create(req.body);
        res.json(task);
    } catch (error) {
        console.log(error);
        if (error.indexOf('Task exists') > -1) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(500);
    }
});

// PUT route
router.put('/', async (req, res) => {
    console.log(`Updating task id ${req.body.id} to: ${JSON.stringify(req.body)}`);
    try {
        let task = await taskService.update(req.body);
        res.json(task);
    } catch (error) {
        console.log(error);
        if (error.indexOf('Invalid id') > -1) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(500);
    }
});

module.exports = router;
