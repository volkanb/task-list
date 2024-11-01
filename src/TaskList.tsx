// src/TaskList.tsx
import React from "react";
import { List, ListItem, ListItemText, Checkbox, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteTask }) => {
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
            <ListItemText
              primary={task.text}
              primaryTypographyProps={{
                style: { textDecoration: task.completed ? "line-through" : "none" },
              }}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDeleteTask(task.id)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default TaskList;
