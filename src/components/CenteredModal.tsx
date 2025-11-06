import { Box, Modal } from "@mui/material";
import { type ReactNode } from "react";

type Props = {
  open: boolean,
  handleClose: () => void;
  children: ReactNode
}

const CenteredModal = ({open, handleClose, children}: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: "none",
        width: "50%"
      }}>
        {children}
      </Box>
    </Modal>
  )
}

export default CenteredModal;
