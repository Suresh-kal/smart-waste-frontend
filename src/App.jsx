import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RegisterBin from "./pages/RegisterBin";
import ManageBins from "./pages/ManageBins";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Users from "./pages/Users";
function App() {
    return (
        <Routes>

            {/* Login */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
    path="/register"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <RegisterBin />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

            <Route
    path="/manage"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <ManageBins />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

            {/* Redirect unknown routes */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
            <Route
    path="/users"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <Users />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

        </Routes>
    );
}

export default App;