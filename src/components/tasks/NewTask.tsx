import { Box } from "@mui/material";
import TaskForm from "../../forms/tasks/taskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/tasks/apis";
import { useSnackbar } from "../../providers/SnackbarProvider";

type Props = {
    handleClose: () => void;
}

const NewTask = ({handleClose}: Props) => {
    const {showSnackbar} = useSnackbar()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            showSnackbar("Task created successfully", "success")
            handleClose()
        },
        onError: (err) => {
            showSnackbar(err.message, "error")
        }
    })

    return (
        <Box>
            <TaskForm task={null} onSubmit={mutation.mutate}/>
        </Box>
    )
}

export default NewTask;
