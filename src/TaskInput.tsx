// src/TaskInput.tsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface TaskInputProps {
  onAddTask: (taskText: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask("");
    }
  };

  return (
    <Box display="flex" gap={2} marginY={2}>
      <TextField
        variant="outlined"
        label="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add
      </Button>
    </Box>
  );
};

export default TaskInput;
