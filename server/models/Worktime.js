const mongoose = require('mongoose');

const WorktimeSchema = new mongoose.Schema({
    start: {
        type: Date,
        default: Date.now,
        required: true
    },
    end: {
        type: Date,
        default: null
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

WorktimeSchema.virtual('computedTime').get(function(){
    if(this.end !== null) {
        return this.end - this.start
    }
})

module.exports = mongoose.model('Worktime', WorktimeSchema);