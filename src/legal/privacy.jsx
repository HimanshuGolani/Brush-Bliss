import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "lenis/dist/lenis.css";
import "../index.css";
import LegalPage from "../components/legal/LegalPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LegalPage doc="privacy" />
  </StrictMode>
);
