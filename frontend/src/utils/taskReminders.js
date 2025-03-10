export const checkOverdueTasks = (tasks, setTasks) => {
    const now = new Date();
    let updatedTasks = [...tasks];

    updatedTasks.forEach(task => {
        if (new Date(task.deadline) < now && !task.overdueNotified) {
            notifyOverdue(task);
            task.overdueNotified = true;
        }
    });

    setTasks(updatedTasks); // Tasks ko update karna zaroori hai
};

const notifyOverdue = (task) => {
    if (Notification.permission === "granted") {
        new Notification("Task Overdue!", {
            body: `Your task "${task.title}" is overdue!`,
            icon: "/warning-icon.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") notifyOverdue(task);
        });
    }
};
