// src/App.tsx
import React from "react";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      {/* Components will be added here in the next steps */}
    </Container>
  );
};

export default App;
