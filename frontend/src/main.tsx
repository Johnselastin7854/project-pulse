import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Toaster />
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
