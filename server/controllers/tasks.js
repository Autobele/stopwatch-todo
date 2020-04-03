const Task = require('../models/Task');

module.exports = {
    /* 
    @desc Get all tasks
    @route GET /api/v1/tasks
    @acess Public
    */
    async getTasks(req, res, next) {
        try {
            const tasks = await Task.find();
            res.status(200).json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (err) {
            next(err);
        }
    },
    /*
    @desc Get single task
    @route GET /api/v1/tasks/:id
    @acess Public
    */
    async getTask(req, res, next) {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return next(err);
            }
            res.status(200).json({
                success: true,
                data: task
            });
        } catch (err) {
            next(err);
        }
    },
    /*
    @desc Create new task
    @route POST /api/v1/tasks
    @acess Public
    */
    async createTask(req, res, next) {
        try {
            const task = await Task.create(req.body);
            res.status(201).json({
                success: true,
                data: task
            });
        } catch (err) {
            next(err);
        }
    },
    /*
    @desc Update task
    @route PUT /api/v1/tasks
    @acess Public
    */
    async updateTask(req, res, next) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!task) {
                return next(err);
            }

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (err) {
            next(err);
        }
    },
    /*
    @desc Delete task
    @route DELETE api/v1/task/:id
    @acess Public
    */
    async deleteTask(req, res, next) {
        console.log('a')
        try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if (!task) {
                return next(err);
            }

            res.status(200).json({
                success: true,
                data: {}
            });
        } catch (err) {
            next(err);
        }
    }
}