const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
