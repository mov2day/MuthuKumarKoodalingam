import { createRoot } from "react-dom/client";

import "./styles.css";
import { Portfolio } from "./routes/index";

createRoot(document.getElementById("root")!).render(<Portfolio />);
