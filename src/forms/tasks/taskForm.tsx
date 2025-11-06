import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { fetchAssignees } from "../../api/users/apis";
import type { Task } from "../../api/tasks/types";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskSchema, { STATUS_OPTIONS, type TaskFormDataType } from "./schema";

type Props = {
    task: Task | null,
    onSubmit: (task: TaskFormDataType) => void
}

const TaskForm = ({task, onSubmit}: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            assignee: task?.assignee.id || "",
            description: task?.description || "",
            status: task?.status || "pending",
            title: task?.title || ""
        }
    });

    const {
        data: assignees,
        isLoading
    }= useQuery({
        queryKey: ["assignees"],
        queryFn: fetchAssignees
    })

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            width: "100%",
        }}>
            <Typography variant="h4">
                {task ? "Update Task" : "Create Task"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                <Box sx={{mt:3}}>
                    <TextField
                        label="Title"
                        fullWidth
                        error={!!errors.title} 
                        {...register("title")} />
                    { errors.title && (
                        <Typography color="error" variant="subtitle2">
                            {errors.title.message}
                        </Typography>
                    ) }
                </Box>
                <Box sx={{mt:3}}>
                    <TextField
                        label="Description"
                        multiline
                        fullWidth
                        minRows={2}
                        maxRows={7}
                        error={!!errors.description} 
                        {...register("description")}/>
                    { errors.description && (
                        <Typography color="error" variant="subtitle2">
                            {errors.description.message}
                        </Typography>
                    ) }
                </Box>
                <Box sx={{mt:3}}>
                    <Controller 
                        name="status"
                        control={control}
                        render={({field, fieldState}) => (
                            <TextField
                                select
                                fullWidth
                                error={!!fieldState.error}
                                label="Status"
                                {...field}>
                                    {STATUS_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        )}
                    />
                </Box>
                <Box sx={{mt:3}}>
                    <Controller
                        name="assignee"
                        control={control}
                        render={({field, fieldState})=>(
                            <TextField
                                select
                                fullWidth
                                error={!!fieldState.error}  
                                label="Assignee"
                                {...field}
                                focused
                                SelectProps={{ displayEmpty: true }}>
                                <MenuItem value="">
                                    Select an Assignee
                                </MenuItem>
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    assignees?.assignees?.map((assignee)=>(
                                        <MenuItem key={assignee.id} value={assignee.id}>
                                            {assignee.name}
                                        </MenuItem>
                                    ))
                                )}

                            </TextField>
                        )}
                    />
                    { errors.assignee && (
                        <Typography color="error" variant="subtitle2">
                            {errors.assignee.message}
                        </Typography>
                    ) }
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                    <Button type="submit" variant="contained">{task ? "Update Task" : "Create Task"}</Button>
                </Box>
            </form>
        </Box>
    )
}

export default TaskForm;
