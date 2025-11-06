import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/tasks/apis";
import TasksTable from "./TasksTable";
import { useState } from "react";
import NewTask from "./NewTask";
import EditTask from "./EditTask";
import type { Task } from "../../api/tasks/types";
import DeleteTask from "./DeleteTask";
import CenteredModal from "../CenteredModal";

type ActionState = {
  type: "new" | "edit" | "delete" | null;
  task: Task | null;
};

const TaskList = () => {
    const [action, setAction] = useState<ActionState>({ type: null, task: null });
    const closeAction = () => setAction({ type: null, task: null });
    const handleCreateTask = () => setAction({ type: "new", task: null });
    const handleEditTask = (task: Task) => setAction({ type: "edit", task });
    const handleDeleteTask = (task: Task) => setAction({ type: "delete", task });

    const {
        data: tasks,
        isLoading
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        retry: false
    })

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", position: "relative" }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Box sx={{ width: "100%"}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Typography fontWeight={600} variant="h5">Tasks</Typography>
                        <Button variant="contained" onClick={handleCreateTask}>+ Add Task</Button>
                    </Box>
                    <Box sx={{mt:3}}>
                        {(tasks?.tasks.length && tasks?.tasks.length as number > 0) ? 
                            <TasksTable handleEdit={handleEditTask} handleDelete={handleDeleteTask} tasks={tasks} /> : (
                            <Typography>
                                No Tasks found
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            <CenteredModal open={action.type=="new"} handleClose={closeAction}>
                <NewTask handleClose={closeAction} />
            </CenteredModal>
            <CenteredModal open={action.type=="edit"} handleClose={closeAction}>
                <EditTask task={action.task as Task} handleClose={closeAction} />
            </CenteredModal>
            <CenteredModal open={action.type=="delete"} handleClose={closeAction}>
                <DeleteTask task={action.task as Task} handleClose={closeAction} />
            </CenteredModal>
        </Box>
    )
};

export default TaskList;
