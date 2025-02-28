import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

const root = document.getElementById("root");
const app = createRoot(root as HTMLElement);

app.render(
  <StrictMode>
    <App />
  </StrictMode>
);
