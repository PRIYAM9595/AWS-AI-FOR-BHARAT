import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Base URL for the new backend
    const API_URL = `${import.meta.env.VITE_API_URL}/api`;

    useEffect(() => {
        // Check for saved user on initial load
        const savedUser = localStorage.getItem("skillgps_user");
        const token = localStorage.getItem("skillgps_token");
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Login failed");

            localStorage.setItem("skillgps_user", JSON.stringify(data.user));
            localStorage.setItem("skillgps_token", data.token);
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Registration failed");

            localStorage.setItem("skillgps_user", JSON.stringify(data.user));
            localStorage.setItem("skillgps_token", data.token);
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("skillgps_user");
        localStorage.removeItem("skillgps_token");
        setUser(null);
    };

    const uploadResume = async () => {
        // Call dummy endpoint
        try {
            const response = await fetch(`${API_URL}/auth/upload-resume`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id || "dummy_id" }),
            });
            const data = await response.json();
            if (data.success && user) {
                const updatedUser = { ...user, hasResume: true };
                setUser(updatedUser);
                localStorage.setItem("skillgps_user", JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error("Resume upload mocked locally due to err", err);
            // Fallback local update if server fails
            if (user) {
                const updatedUser = { ...user, hasResume: true };
                setUser(updatedUser);
                localStorage.setItem("skillgps_user", JSON.stringify(updatedUser));
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, uploadResume }}>
            {children}
        </AuthContext.Provider>
    );
};
