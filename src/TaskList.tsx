// src/TaskList.tsx
import React from "react";
import { List, ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
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
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            edge="start"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <ListItemText
            primary={task.text}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
