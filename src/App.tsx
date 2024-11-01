import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "active" | "completed" | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
        <TaskInput onAddTask={addTask} />
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          style={{ margin: "1rem 0" }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="outlined" color="secondary" onClick={handleClearCompleted}>
          Clear Completed
        </Button>
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
        />
      </Paper>
    </Container>
  );
};

export default App;
