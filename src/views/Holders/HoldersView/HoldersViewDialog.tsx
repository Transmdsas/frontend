import React, { useEffect, useState } from "react";
import ViewDialog from "../../../components/forms/Dialog/ViewDialog";
import { Holder, HolderDocument } from "../../../store/holders/types";
import { DetailCard } from "../../../components/DetailCard";
import { Fab, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PrintIcon from "@mui/icons-material/Print";
import { useFileDownloader } from "../../../hooks/useFileDownloader";
import { useGetDocuments } from "../../../hooks/useGetDocuments";
import { usePDF } from "@react-pdf/renderer";
import { HolderPDFView } from "./HoldersPDFView";

interface HolderViewDialogProps {
  holder: Holder;
  openView: boolean;
  onClose?: () => void;
}

export const HolderViewDialog = ({
  holder,
  openView,
  onClose,
}: HolderViewDialogProps) => {
  const [holderDocs, setHolderDocs] = useState<HolderDocument[]>([]);
  const [instance, update] = usePDF({ document: <HolderPDFView holderData={holder}/> });
  const downloadFile = useFileDownloader();
  const { holderDocuments } = useGetDocuments();

  useEffect(() => {
    holderDocuments(holder.documentNumber).then((res) => {
      setHolderDocs(res);
    });
  }, [holder, holderDocuments]);

  return (
    <ViewDialog
      open={openView}
      onClose={onClose}
      title="Detalles del Tenedor"
      titleStyles={{
        display: "flex",
        justifyContent: "center",
        fontStyle: "normal",
        fontWeight: 800,
        fontSize: "32px",
        lineHeight: "24px",
        color: "#203764",
        paddingTop: "30px",
        paddingBottom: "20px",
        backgroundColor: "rgb(244 245 250)",
      }}
      contentStyles={{
        width: "60vw",
        minHeight: "50vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "rgb(244 245 250)",
        paddingBottom: "50px",
      }}
      scrollDialog="body"
    >
      <DetailCard
        cardTitle={`${holder.firstName} ${holder.lastName}`}
        cardWidth={"50%"}
        cardSubTitle={`${holder.email} / ${holder.cellphone}`}
      >
        <List>
          <ListItem divider={true}>
            <ListItemText
              primary="Tipo Documento"
              secondary={holder.documentType.description}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Nro. Documento"
              secondary={holder.documentNumber}
              sx={{ width: "45%" }}
            />
          </ListItem>
          <ListItem divider={true}>
            <ListItemText
              primary="Ciudad"
              secondary={holder.city.description}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Dirección"
              secondary={holder.address}
              sx={{ width: "45%" }}
            />
          </ListItem>

          {holder.bankCertification !== "3" && (
            <>
              <ListItem divider={true}>
                <ListItemText
                  primary="Cert. Bancaria"
                  secondary={holder.bankCertification === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
                <ListItemText
                  primary="Banco"
                  secondary={holder.bank.description}
                  sx={{ width: "45%" }}
                />
              </ListItem>
              <ListItem divider={true}>
                <ListItemText
                  primary="Rut"
                  secondary={holder.rut === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
                <ListItemText
                  primary="Rut con Actividad"
                  secondary={holder.hasActivityRut === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
              </ListItem>
            </>
          )}
          <ListItem divider={true}>
            <ListItemText
              primary="Saldos"
              secondary={holder.balances === true ? "Si" : "No"}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Anticipos"
              secondary={holder.advances === true ? "Si" : "No"}
              sx={{ width: "45%" }}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton
                edge="start"
                aria-label="download"
                onClick={() => downloadFile(holder.contractFile)}
              >
                <CloudDownloadIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="Tipo de Contrato"
              secondary={holder.contractType.description}
              sx={{ width: "90%" }}
            />
          </ListItem>
        </List>
      </DetailCard>
      <DetailCard cardTitle={"Documentos"} cardWidth={"35%"}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {holderDocs.map((holderDoc) => {
            return (
              <ListItem
                key={holderDoc.id}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="start"
                    aria-label="download"
                    onClick={() =>
                      downloadFile(
                        holderDoc.documentPath.toString().replace("public/", "")
                      )
                    }
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={holderDoc.documentList.documentDescription}
                  secondary={holderDoc.observation}
                  sx={{ width: "80%" }}
                />
              </ListItem>
            );
          })}
        </List>
      </DetailCard>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        href={instance.url != null ? instance.url : ""}
        target="_blank"
        download={`${holder.firstName}_${holder.lastName}.pdf`}
      >
        <PrintIcon />
      </Fab>
    </ViewDialog>
  );
};
