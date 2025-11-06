export interface AssigneesResponse {
    assignees: Assignee[]
};

export interface Assignee{
    id: string;
    name: string;
}

export interface User {
    id: string;
    email: string;
    role: "admin"|"user",
    name: string
}
