import { createContext, useContext, useState, useEffect } from "react";
import { apiUrl, postJson } from "../lib/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            const data = await postJson("/api/auth/login", { email, password });

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
            const data = await postJson("/api/auth/register", { name, email, password });

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

    const uploadResume = async (file) => {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("userId", user?.id || "dummy_id");

        const response = await fetch(apiUrl("/api/auth/upload-resume"), {
            method: "POST",
            body: formData,
        });

        let data = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok || !data?.success) {
            throw new Error(data?.error || "Resume upload failed. Please retry.");
        }

        if (user) {
            const updatedUser = data?.user ? { ...user, ...data.user, hasResume: true } : { ...user, hasResume: true };
            setUser(updatedUser);
            localStorage.setItem("skillgps_user", JSON.stringify(updatedUser));
        }

        return data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, uploadResume }}>
            {children}
        </AuthContext.Provider>
    );
};
