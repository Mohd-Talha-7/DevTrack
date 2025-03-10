const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Task = require("./models/Task");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (Updated)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devtrack")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Create Task (POST)
app.post("/tasks", async (req, res) => {
    try {
        const { title, category, priority, deadline, user } = req.body;

        if (!title || !category || !priority || !deadline) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const task = new Task({
            title,
            category,
            priority,
            deadline: new Date(deadline), // ✅ Convert to Date
            user: user || null // ✅ Avoid error if user is missing
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error("❌ Error adding task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get All Tasks (GET)
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error("❌ Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Update Task (PUT)
app.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ error: "Task not found" });
        res.json(updatedTask);
    } catch (err) {
        console.error("❌ Error updating task:", err);
        res.status(400).json({ error: err.message });
    }
});

// ✅ Delete Task (DELETE)
app.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task Deleted" });
    } catch (err) {
        console.error("❌ Error deleting task:", err);
        res.status(400).json({ error: err.message });
    }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
