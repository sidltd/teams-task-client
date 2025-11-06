import type { Assignee } from "../users/types";

export interface Tasks {
    tasks: Task[]
}

export interface Task {
    id?: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignee: Assignee
}

export type TaskStatus = 'pending' | 'in_progress' | 'done';
