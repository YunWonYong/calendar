import { RouterProvider } from "react-router-dom";

import router from "@/router";
import { ThemeProvider } from "./contexts/theme/ThemeProvider";

import "./styles/theme.css";

const App = () => {
    return (
        <ThemeProvider>
            <RouterProvider 
                router={ router }
            />
        </ThemeProvider>
    );
};

export default App;