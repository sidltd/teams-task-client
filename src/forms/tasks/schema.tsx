import * as z from 'zod';
import type { TaskStatus } from '../../api/tasks/types';

export interface TaskFormDataType {
    title: string;
    description: string;
    status: TaskStatus;
    assignee: string
}

export const STATUS_OPTIONS = [
    { label: "Pending", value: "pending" },
  	{ label: "In Progress", value: "in_progress" },
  	{ label: "Done", value: "done" },
];

const TaskSchema = z.object({
    title: z.string()
            .min(1, "Title is required")
            ,
    description: z.string()
                  .min(1, "Description is required"),
    status: z.enum(["pending", "in_progress", "done"]),
    assignee: z.string()
                 .min(1, "Assignee is required for a task")
})

export default TaskSchema;
