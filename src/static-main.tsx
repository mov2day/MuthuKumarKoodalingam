import { createRoot } from "react-dom/client";

import "./styles.css";
import { Portfolio } from "./routes/index";

export function mountPortfolio(root: HTMLElement) {
  createRoot(root).render(<Portfolio />);
}
