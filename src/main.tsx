import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import alertify from "alertifyjs";
import { initDB } from "./lib/db/config";
import { registerSW } from "virtual:pwa-register";

// Configure Alertify
alertify.set("notifier", "position", "bottom-right");
alertify.set("notifier", "delay", 3);

// Register Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alertify.success("App ready for offline use");
  },
});

// Initialize database before rendering
initDB()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    alertify.error("Error initializing the application. Please reload.");
  });
