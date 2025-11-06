import { Box, Button, Typography } from "@mui/material"
import { useSnackbar } from "../../providers/SnackbarProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "../../api/tasks/apis"
import type { Task } from "../../api/tasks/types"

type Props = {
    task: Task,
    handleClose: () => void;
}

const DeleteTask = ({task, handleClose}: Props) => {
    const {showSnackbar} = useSnackbar()
    const queryClient = useQueryClient()
    
    const mutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: ()=>{
            showSnackbar("Task deleted successfully", "success")
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            handleClose()
        }
    })

    const handleDelete = () => {
        mutation.mutate(task.id as string)
    }
    
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24
        }}>
            <Typography>
                Are you sure you want to delete this task
            </Typography>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly"
            }}>
                <Button sx={{ mt: 5}} variant="contained" onClick={handleClose}>Cancel</Button>
                <Button sx={{ mt: 5}} color="error" variant="contained" onClick={handleDelete}>Delete</Button>
            </Box>
        </Box>
    )
}

export default DeleteTask;
