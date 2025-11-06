import { Box } from "@mui/material";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../api/tasks/apis";
import TaskForm from "../../forms/tasks/taskForm";
import type { Task } from "../../api/tasks/types";

type Props = {
    task: Task,
    handleClose: () => void;
}
const EditTask = ({task, handleClose}: Props) => {
    const {showSnackbar} = useSnackbar();
    const queryClient = useQueryClient()
    
    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            showSnackbar("Task updated successfully", "success")
            handleClose();
        },
        onError: (err) => {
            showSnackbar(err.message, "error")
        }
    })
    return (
        <Box>
            <TaskForm task={task} onSubmit={(values: any)=>mutation.mutate({id: task.id as string, task: values})} />
        </Box>
    )
};

export default EditTask;
