import React, { useEffect, useState } from "react";
import { Owner, OwnerDocument } from "../../../store/owners/types";
import { useFileDownloader } from "../../../hooks/useFileDownloader";
import { useGetDocuments } from "../../../hooks/useGetDocuments";
import ViewDialog from "../../../components/forms/Dialog/ViewDialog";
import { DetailCard } from "../../../components/DetailCard";
import { Fab, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PrintIcon from "@mui/icons-material/Print";
import { HolderPDFView } from "../../Holders/HoldersView/HoldersPDFView";
import { usePDF } from "@react-pdf/renderer";

interface OwnerViewDialogProps {
  owner: Owner;
  openView: boolean;
  onClose?: () => void;
}

export const OwnersViewDialog = ({
  owner,
  openView,
  onClose,
}: OwnerViewDialogProps) => {
  const [ownerDocs, setOwnerDocs] = useState<OwnerDocument[]>([]);
  const [instance, update] = usePDF({ document: <HolderPDFView holderData={owner}/> });

  const downloadFile = useFileDownloader();
  const { ownerDocuments } = useGetDocuments();

  useEffect(() => {
    ownerDocuments(owner.documentNumber).then((res) => {
      setOwnerDocs(res);
    });
  }, [owner, ownerDocuments]);

  return (
    <ViewDialog
      open={openView}
      onClose={onClose}
      title="Detalles del Propietario"
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
    >
      <DetailCard
        cardTitle={`${owner.firstName} ${owner.lastName}`}
        cardWidth={"60%"}
        cardSubTitle={`${owner.email} / ${owner.cellphone}`}
      >
        <List>
        <ListItem divider={true}>
            <ListItemText
              primary="Tipo Documento"
              secondary={owner.documentType.description}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Nro. Documento"
              secondary={owner.documentNumber}
              sx={{ width: "45%" }}
            />
          </ListItem>
          <ListItem divider={true}>
            <ListItemText
              primary="Ciudad"
              secondary={owner.city.description}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Dirección"
              secondary={owner.address}
              sx={{ width: "45%" }}
            />
          </ListItem>

          {owner.bankCertification !== "3" && (
            <>
              <ListItem divider={true}>
                <ListItemText
                  primary="Cert. Bancaria"
                  secondary={owner.bankCertification === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
                <ListItemText
                  primary="Banco"
                  secondary={owner.bank.description}
                  sx={{ width: "45%" }}
                />
              </ListItem>
              <ListItem divider={true}>
                <ListItemText
                  primary="Rut"
                  secondary={owner.rut === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
                <ListItemText
                  primary="Rut con Actividad"
                  secondary={owner.hasActivityRut === "1" ? "Si" : "No"}
                  sx={{ width: "45%" }}
                />
              </ListItem>
            </>
          )}
          <ListItem divider={true}>
            <ListItemText
              primary="Saldos"
              secondary={owner.balances === true ? "Si" : "No"}
              sx={{ width: "45%" }}
            />
            <ListItemText
              primary="Anticipos"
              secondary={owner.advances === true ? "Si" : "No"}
              sx={{ width: "45%" }}
            />
          </ListItem>
        </List>
      </DetailCard>
      <DetailCard cardTitle={"Documentos"} cardWidth={"35%"}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {ownerDocs.map((ownerDoc) => {
            return (
              <ListItem
                key={ownerDoc.id}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="start"
                    aria-label="download"
                    onClick={() =>
                      downloadFile(
                        ownerDoc.documentPath.toString().replace("public/", "")
                      )
                    }
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={ownerDoc.documentList.documentDescription}
                  secondary={ownerDoc.observation}
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
        download={`${owner.firstName}_${owner.lastName}.pdf`}
      >
        <PrintIcon />
      </Fab>
    </ViewDialog>
  );
};

export default OwnersViewDialog;
