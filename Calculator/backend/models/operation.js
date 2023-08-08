const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
    operation: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;