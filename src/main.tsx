import App from "@/App.tsx";
import "@/index.css";
import "@/styles/print.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" richColors closeButton />
  </React.StrictMode>
);
