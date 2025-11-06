import type { AssigneesResponse } from "./types";

export const fetchAssignees = async (): Promise<AssigneesResponse> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/assignees`, {
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
