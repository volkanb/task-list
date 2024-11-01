import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, ToggleButton, ToggleButtonGroup, Button, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, Stack } from "@mui/material";
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
  const [sortBy, setSortBy] = useState<"text" | "completed">("text");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    showSnackbar("Task added successfully!");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showSnackbar("Task completion toggled!");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showSnackbar("Task deleted!");
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    showSnackbar("Task updated!");
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    showSnackbar("Completed tasks cleared!");
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: "all" | "active" | "completed" | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "text") {
      return a.text.localeCompare(b.text);
    } else {
      return Number(a.completed) - Number(b.completed); // completed is boolean, convert to number
    }
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>
        <TaskInput onAddTask={addTask} />
        <Stack spacing={2} sx={{ mb: 2 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            fullWidth
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
          </ToggleButtonGroup>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "text" | "completed")}
              label="Sort By"
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearCompleted}
            fullWidth
            size="small"
          >
            Clear Completed
          </Button>
        </Stack>
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
        />
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
