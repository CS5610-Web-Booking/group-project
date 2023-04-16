import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

