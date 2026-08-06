import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export async function getNotifications() {
    try {
        const response = await api.get("/api/notifications");
        return response.data;
    } catch (err) {
        console.error("Error in getNotifications:", err);
        throw err.response?.data || { message: "Something went wrong" };
    }
}

export async function markNotificationsAsRead() {
    try {
        const response = await api.post("/api/notifications/mark-read");
        return response.data;
    } catch (err) {
        console.error("Error in markNotificationsAsRead:", err);
        throw err.response?.data || { message: "Something went wrong" };
    }
}

export async function clearNotifications() {
    try {
        const response = await api.delete("/api/notifications");
        return response.data;
    } catch (err) {
        console.error("Error in clearNotifications:", err);
        throw err.response?.data || { message: "Something went wrong" };
    }
}

export async function clearNotifications() {
    try {
        const response = await api.delete("/api/notifications");
        return response.data;
    } catch (err) {
        console.error("Error in clearNotifications:", err);
        throw err.response?.data || { message: "Something went wrong" };
    }
}
