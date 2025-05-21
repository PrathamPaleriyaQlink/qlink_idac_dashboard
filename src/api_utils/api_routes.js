// api_utils.js
// const BASE_URL = "https://65.20.69.130:8000";
const BASE_URL = "https://qlink-idac-backend.vercel.app";

function getToken() {
    return localStorage.getItem("token");
}

function authHeaders() {
    const token = getToken();
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
}

export async function login(username, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    const expiresIn = 15 * 60 * 1000; // 15 minutes 
    const now = new Date().getTime();

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("token_expiry", now + expiresIn);
    return data;
}

export async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch users");

    return response.json();
}

export async function getUserById(id) {
    const response = await fetch(`${BASE_URL}/people?id=${id}`, {
        method: "POST",
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    return response.json();
}

export async function getEvents() {
    const response = await fetch(`${BASE_URL}/events`, {
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch events");

    return response.json();
}

export async function getEventById(id) {
    const response = await fetch(`${BASE_URL}/event?id=${id}`, {
        method: "POST",
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch event");

    return response.json();
}

export async function addEvent(eventData) {
    const response = await fetch(`${BASE_URL}/add_event`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to add event");

    return response.json();
}

export async function updateEvent(id, eventData) {
    const response = await fetch(`${BASE_URL}/update-event?id=${id}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to update event");

    return response.json();
}

export const handleAuthError = () => {
    localStorage.removeItem("token");
};

export async function getAnalytics() {
    const response = await fetch(`${BASE_URL}/analytics`, {
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch analytics");

    return response.json();
}

export async function deleteEvent(id) {
    const response = await fetch(`${BASE_URL}/event?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Failed to fetch analytics");

    return response.json();
}