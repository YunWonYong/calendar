import { RouterProvider } from "react-router-dom";

import router from "@/router";

import ThemeProvider from "./contexts/theme/ThemeProvider";
import AuthProvider from "./contexts/auth/AuthProvider";
import AutoLoginOverlay from "./components/auth/AutoLoginOverlay";

import useAuth from "./hooks/auth/useAuth";

import "./styles/theme.css";

const AutoLoginOverlayWrap = () => {
    const { isLoading } = useAuth();
    if (isLoading) {
        return <AutoLoginOverlay />
    }
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider >
                <AutoLoginOverlayWrap />
                <RouterProvider 
                    router={ router }
                />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;