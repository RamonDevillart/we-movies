// src/App.tsx
import React from "react";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./components/GlobalStyles";
import Container from "./components/Container/Container";

const App: React.FC = () => {
  return (
    <Container>
      <GlobalStyles />
      <AppRoutes />
    </Container>
  );
};

export default App;
