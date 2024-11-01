// src/TaskList.tsx
import React, { useState } from "react";
import { List, ListItem, ListItemText, Checkbox, IconButton, Paper, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (id: number) => {
    if (editText.trim() !== "") {
      onEditTask(id, editText);
      setEditingTaskId(null);
      setEditText("");
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <Paper
          key={task.id}
          style={{
            marginBottom: "8px",
            padding: "8px 16px",
            backgroundColor: task.completed ? "#e0f7fa" : "#ffffff",
          }}
          elevation={1}
        >
          <ListItem disableGutters>
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              color="primary"
            />
            {editingTaskId === task.id ? (
              <>
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleEditSubmit(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSubmit(task.id);
                  }}
                  size="small"
                  variant="outlined"
                  autoFocus
                />
              </>
            ) : (
              <>
                <ListItemText
                  primary={task.text}
                  primaryTypographyProps={{
                    style: { textDecoration: task.completed ? "line-through" : "none" },
                  }}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(task)}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteTask(task.id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default TaskList;
