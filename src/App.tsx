// src/App.tsx
import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />
      </Paper>
    </Container>
  );
};

export default App;
