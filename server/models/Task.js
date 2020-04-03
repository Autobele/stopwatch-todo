const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        default: 'pendente'
    },
    assignee: {
        type: String,
        required: true,
        trim: true
    },
    worktimes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worktime',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Task', TaskSchema);