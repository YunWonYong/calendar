import { createRoot } from "react-dom/client";

import { initConfig } from "@/config";

import { initConsoleLogger } from "./analytics/logger/console";
import ErrorPage from "./error";

import "./styles/global.css";

const container = document.getElementById("root");
if (!container) {
    throw new Error("root element not found.");
}

const root = createRoot(container);

(() => {
    const initConfigResult = initConfig();
    let errorMessage: string | undefined = initConfigResult.errorMessage;
    const config = initConfigResult.config;
    if (!errorMessage) {
        const initConsoleLoggerResult =  initConsoleLogger(config.logLevel);
        if (initConsoleLoggerResult.errorMessage) {
            errorMessage = initConsoleLoggerResult.errorMessage;
        }
    } 
    
    if (errorMessage) {
        root.render(
            <ErrorPage 
                errorMessage={ errorMessage }
            />
        );
        return;
    }

    import("@/App")
        .then(({ default: App }) => {
            root.render(<App />);
        })
        .catch((err) => {
            root.render(
                <ErrorPage errorMessage={`App loading failed: ${err.message}`} />
            );
        });
})();
