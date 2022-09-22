import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PopUp {
  status: any;
  handleCloseByError: Function;
  handleClose: Function;
  open: boolean;
}

export default function DialogPopOver({
  status,
  handleCloseByError,
  handleClose,
  open,
}: PopUp) {
  //   const [open, setOpen] = React.useState(true);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  console.log({ status });

  return (
    <div>
      <Dialog
        open={open}
        onClose={(e) => handleClose(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"success"}>
          {status === 201
            ? "La información se ha guardado correctamente"
            : "Lo sentimos, hubo un error en el Servidor"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status === 201
              ? "puede continuar presionando el siguiente enlace:"
              : "Por favor contacte a su equipo de sistemas"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {status === 201 ? (
            <Button onClick={(e) => handleClose(e)} autoFocus>
              Continuar
            </Button>
          ) : (
            <Button onClick={(e) => handleCloseByError(e)}>Entendido</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
