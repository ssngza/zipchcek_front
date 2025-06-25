import App from "@/App.tsx";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/index.css";
import "@/styles/print.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  </React.StrictMode>
);
