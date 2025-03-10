import { useState } from "react";
import { TextField, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel, Typography, FormHelperText, useMediaQuery } from "@mui/material";

export default function AddTaskForm({ addTask }) {
    const [newTask, setNewTask] = useState({ title: "", category: "", deadline: "", priority: "Medium" });
    const [errors, setErrors] = useState({});
    const isMobile = useMediaQuery("(max-width:600px)"); // Detect screen size

    const validateForm = () => {
        let tempErrors = {};
        if (!newTask.title.trim()) tempErrors.title = "Task name is required";
        if (!newTask.category.trim()) tempErrors.category = "Category is required";
        if (!newTask.deadline) tempErrors.deadline = "Deadline is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        addTask(newTask);
        setNewTask({ title: "", category: "", deadline: "", priority: "Medium" });
        setErrors({});
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>Add New Task</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    
                    {/* 🎯 Task Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>

                    {/* 🎯 Category */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Category"
                            variant="outlined"
                            fullWidth
                            value={newTask.category}
                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                            error={!!errors.category}
                            helperText={errors.category}
                        />
                    </Grid>

                    {/* 🎯 Deadline */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.deadline}
                            helperText={errors.deadline}
                        />
                    </Grid>

                    {/* 🎯 Priority Dropdown */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={newTask.priority}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                label="Priority"
                            >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* 🎯 Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth={isMobile} sx={{ height: 56 }}>
                            Add Task
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
    );
}
