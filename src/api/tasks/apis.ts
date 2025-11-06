import type { TaskFormDataType } from "../../forms/tasks/schema";
import type { Task, Tasks } from "./types";

export const fetchTasks = async (): Promise<Tasks> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message)
    }

    return res.json();
};

export const createTask = async (task: TaskFormDataType): Promise<{task: Task}> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message)
    }

    return res.json();
}

export const updateTask = async ({id, task}: {id: string, task: TaskFormDataType}): Promise<{task: Task}> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message)
    }

    return res.json();
}

export const deleteTask = async(id: string): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message)
    }

    return;
}
