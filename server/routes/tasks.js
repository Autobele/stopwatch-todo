const router = require('express').Router();

const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');

router
    .route('/')
    .get(getTasks)
    .post(createTask);

router
    .route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;