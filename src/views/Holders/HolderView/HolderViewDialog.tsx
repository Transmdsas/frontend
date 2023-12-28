import React, { useEffect, useState } from "react";
import ViewDialog from "../../../components/forms/Dialog/ViewDialog";
import { Holder } from "../../../store/holders/types";
import { Card, CardContent, Typography } from "@mui/material";

interface HolderViewDialogProps {
  holder: Holder;
}

export const HolderViewDialog = ({ holder }: HolderViewDialogProps) => {
  const [openDialog, setOpenDialog] = useState(true);
  return (
    <ViewDialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      title={`${holder.firstName} ${holder.lastName}`}
      titleStyles={{
        display: "flex",
        justifyContent: "center",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "24px",
        color: "#203764",
        paddingTop: "24px",
        backgroundColor: 'rgb(244 245 250)'
      }}
      contentStyles={{ width: "50vw", minHeight: "50vh", overflow: "hidden", display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgb(244 245 250)' }}
    >
      <Card sx={{ minWidth: '60%', boxShadow: 'rgba(58, 53, 65, 0.1) 0px 2px 10px 0px' }}>
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Detalles
        </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: '35%' }}>
        <CardContent >
        <Typography gutterBottom variant="h6" component="div">
          Documentos
        </Typography>
        </CardContent>
      </Card>
    </ViewDialog>
  );
};
