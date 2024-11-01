// src/App.tsx
import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import TaskInput from "./TaskInput";

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

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <TaskInput onAddTask={addTask} />
      {/* Task list component will go here */}
    </Container>
  );
};

export default App;
