import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { List, ListItem, ListItemText, IconButton, Paper, Typography, Divider, Chip, Box, useMediaQuery } from "@mui/material";
import { Delete, CheckCircle, Undo } from "@mui/icons-material";

export default function TaskList({ tasks, setTasks, toggleComplete, deleteTask }) {
    const isMobile = useMediaQuery("(max-width:600px)"); // 📱 Detect mobile screens

    // 🎯 Drag & Drop Function
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: "100%", overflowX: "hidden" }}>
            <Typography variant="h6" gutterBottom>Task List</Typography>
            <Divider sx={{ mb: 2 }} />

            {tasks.length === 0 ? (
                <Typography color="textSecondary" align="center">No tasks available</Typography>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="taskList">
                        {(provided) => (
                            <List ref={provided.innerRef} {...provided.droppableProps}>
                                {tasks.map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <ListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    bgcolor: "background.paper",
                                                    mb: 1,
                                                    borderRadius: 2,
                                                    px: 2,
                                                    width: "100%",
                                                    boxShadow: 1,
                                                    flexWrap: "wrap", // ✅ Prevents breaking layout on small screens
                                                }}
                                            >
                                                {/* 🎯 Task Complete Toggle */}
                                                <IconButton
                                                    onClick={() => toggleComplete(task._id, task.completed)}
                                                    color={task.completed ? "success" : "default"}
                                                >
                                                    {task.completed ? <Undo /> : <CheckCircle />}
                                                </IconButton>

                                                {/* 🎯 Task Details */}
                                                <ListItemText
                                                    primary={task.title}
                                                    secondary={`${task.category} - Due: ${new Date(task.deadline).toLocaleDateString("en-GB")}`}
                                                    sx={{
                                                        textDecoration: task.completed ? "line-through" : "none",
                                                        fontSize: isMobile ? "0.85rem" : "1rem",
                                                        flex: 1,
                                                        minWidth: "150px",
                                                        mx: 1,
                                                    }}
                                                />

                                                {/* 🎯 Priority + Delete (Extremes) */}
                                                <Box display="flex" justifyContent="space-between" width="100%">
                                                    {/* 🔥 Priority Chip (Extreme Left) */}
                                                    <Chip
                                                        label={task.priority}
                                                        color={task.priority === "High" ? "error" : task.priority === "Medium" ? "warning" : "success"}
                                                        sx={{
                                                            fontSize: isMobile ? "0.75rem" : "1rem",
                                                            padding: "4px 8px",
                                                        }}
                                                    />

                                                    {/* ❌ Delete Button (Extreme Right) */}
                                                    <IconButton onClick={() => deleteTask(task._id)} color="error" sx={{ ml: "auto" }}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </Paper>
    );
}
