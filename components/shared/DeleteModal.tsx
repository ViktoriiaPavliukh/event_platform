"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteEvent } from "@/lib/actions/event.actions";

const DeleteModal = ({ eventId }: { eventId: string }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteEvent({ eventId, path: pathname });
    setIsDeleting(false);
    setOpen(false);
  };

  return (
    <>
      <DeleteOutlineIcon sx={{ color: "#585858" }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} sx={{ p: "20px" }}>
        <DialogTitle sx={{ p: "20px" }}>
          Are you sure you want to delete?
        </DialogTitle>
        <DialogContent sx={{ p: "20px" }}>
          <DialogContentText>
            This will permanently delete this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: "20px" }}>
          <Button onClick={handleClose} color="primary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
