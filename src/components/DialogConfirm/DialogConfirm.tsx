import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  title: string;
  desc: string;
  open: boolean;
  handleOnClose: () => void;
  handleAction: () => void;
};

export const DialogConfirm: FC<Props> = ({
  title,
  desc,
  open = false,
  handleOnClose,
  handleAction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#222",
            fontFamily: "sans-serif",
            color: "white",
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{desc}</DialogContent>
      <DialogActions>
        <Button onClick={handleAction} sx={{ color: "#27ae60" }}>
          Accept
        </Button>
        <Button onClick={handleOnClose} sx={{ color: "#e74c3c" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
