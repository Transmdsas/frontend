import React, { CSSProperties, ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, DialogProps } from "@mui/material";

interface ViewDialogProps {
  open: boolean;
  title: string;
  onSubmit?: () => void;
  onClose?: () => void;
  children: ReactNode;
  dialogStyles?: CSSProperties; // Prop para estilos del Dialog
  titleStyles?: CSSProperties; // Prop para estilos del DialogTitle
  contentStyles?: CSSProperties; // Prop para estilos del DialogContent
  scrollDialog?: DialogProps["scroll"];
}

function ViewDialog({
  open,
  title,
  onSubmit,
  onClose,
  children,
  dialogStyles,
  titleStyles,
  contentStyles,
  scrollDialog
}: ViewDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} style={dialogStyles} maxWidth='lg' scroll={scrollDialog}>
      <DialogTitle style={titleStyles}>{title}</DialogTitle>
      <DialogContent style={contentStyles}>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ViewDialog;
