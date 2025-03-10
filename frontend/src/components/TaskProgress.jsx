import { LinearProgress, Typography, Box } from "@mui/material";

const TaskProgress = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Box sx={{ width: "100%", my: 2 }}>
            <Typography variant="subtitle1">
                Progress: {completedTasks} / {totalTasks} tasks completed
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
        </Box>
    );
};

export default TaskProgress;
