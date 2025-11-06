import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { Task, Tasks } from "../../api/tasks/types";
import { Edit, Delete } from "@mui/icons-material";
import { STATUS_OPTIONS } from "../../forms/tasks/schema";

type Props = {
    tasks: Tasks,
    handleEdit: (task: Task) => void,
    handleDelete: (task: Task) => void;
}
const TasksTable = ({tasks, handleEdit, handleDelete}: Props) => {
    return (
        <Box>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    boxShadow: "none",
                    "& .MuiTable-root": {
                        borderCollapse: "collapse"
                    },
                    "& .MuiTableCell-root": {
                        borderBottom: "1px solid #e0e0e0",
                        borderRight: "none"
                    }
                }}>
               <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell><Typography>Title</Typography></TableCell>
                        <TableCell><Typography>Description</Typography></TableCell>
                        <TableCell><Typography>Status</Typography></TableCell>
                        <TableCell><Typography>Assigned To</Typography></TableCell>
                        <TableCell><Typography></Typography></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tasks.tasks.map((task: Task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{STATUS_OPTIONS.find(s => s.value == task.status)?.label}</TableCell>
                                <TableCell>{task.assignee.name}</TableCell>
                                <TableCell>
                                <IconButton size="small" color="primary" onClick={()=>handleEdit(task)}>
                                    <Edit fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDelete(task)}>
                                    <Delete fontSize="small" />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TasksTable;
