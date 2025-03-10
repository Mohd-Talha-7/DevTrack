import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import TaskProgress from "./components/TaskProgress";
import ActivityLog from "./components/TaskHistory";
import TaskFilters from "./components/TaskFilters";
import { checkOverdueTasks } from "./utils/taskReminders";

export default function App() {
    const { darkMode, toggleDarkMode } = useThemeContext();  
    const [tasks, setTasks] = useState([]);
    const [activity, setActivity] = useState([]);
    const [filter, setFilter] = useState({ search: "", priority: "" });
    const [sort, setSort] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/tasks")
            .then(res => setTasks(res.data))
            .catch(err => console.error("Error fetching tasks:", err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => checkOverdueTasks(tasks, setTasks), 60000);
        return () => clearInterval(interval);
    }, [tasks]);

    const logActivity = (message) => {
        setActivity(prev => [`${new Date().toLocaleString()} - ${message}`, ...prev]);
    };

    const addTask = (newTask) => {
        axios.post("http://localhost:5000/tasks", { ...newTask, completed: false })
            .then(res => {
                setTasks(prevTasks => [...prevTasks, res.data]);
                logActivity(`Task Added: "${newTask.title}"`);
            })
            .catch(err => console.error("Error adding task:", err));
    };

    const toggleComplete = (id, completed) => {
        axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed })
            .then(() => {
                setTasks(prevTasks => prevTasks.map(task => 
                    task._id === id ? { ...task, completed: !completed } : task
                ));
                logActivity(`Task Marked as ${!completed ? "Completed" : "Incomplete"}`);
            })
            .catch(err => console.error("Error updating task:", err));
    };

    const deleteTask = (id) => {
        const deletedTask = tasks.find(task => task._id === id);
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
                logActivity(`Task Deleted: "${deletedTask?.title}"`);
            })
            .catch(err => console.error("Error deleting task:", err));
    };

    const filteredTasks = tasks
        .filter(task => 
            (filter.priority === "" || task.priority === filter.priority) &&
            (filter.search === "" || task.title.toLowerCase().includes(filter.search.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = new Date(a.deadline).getTime();
            const dateB = new Date(b.deadline).getTime();

            if (sort === "latest") return dateB - dateA;
            if (sort === "oldest") return dateA - dateB;
            if (sort === "priority") {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return 0;
        });

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
    <Typography 
        variant="h3" 
        sx={{ 
            fontSize: { xs: "1.8rem", sm: "2.5rem" },  // Mobile pe thoda chhota, Desktop pe bada
            fontWeight: "bold", 
            textAlign: { xs: "center", sm: "left" }, 
            flexGrow: 1 
        }}
    >
        DevTrack - Task Manager
    </Typography>
    <Button 
        variant="contained" 
        onClick={toggleDarkMode} 
        sx={{ 
            mt: { xs: 1, sm: 0 }, 
            fontSize: { xs: "0.8rem", sm: "1rem" } // Button ka text bhi responsive
        }}
    >
        {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
</div>

            <TaskFilters setFilter={setFilter} setSort={setSort} /> 
            <TaskProgress tasks={tasks} /> 
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={filteredTasks} setTasks={setTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
            <ActivityLog activity={activity} />
        </Container>
    );
}