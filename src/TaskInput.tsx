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
    <Box display="flex" gap={2} alignItems="center" marginBottom={3}>
      <TextField
        variant="outlined"
        label="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} size="large">
        Add
      </Button>
    </Box>
  );
};

export default TaskInput;
