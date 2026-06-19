import { createRoot } from "react-dom/client";

import App from "@/App";
import { initConfig } from "@/config";
import ErrorPage from "./error";

import "./styles/global.css";

const container = document.getElementById("root");
if (!container) {
    throw new Error("root element not found.");
}

const errorMessage = initConfig();
const root = createRoot(container);
root.render(
    errorMessage
        ?   <ErrorPage 
                errorMessage={ errorMessage }
            />
        :   <App />
);