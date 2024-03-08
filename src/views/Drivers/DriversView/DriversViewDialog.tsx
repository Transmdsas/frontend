import React, { useEffect, useState } from "react";
import { Driver, DriverDocument } from "../../../store/drivers/types";
import ViewDialog from "../../../components/forms/Dialog/ViewDialog";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import config from "../../../config";
import { dateFormatter } from "../../../utils/utils";
import { HolderPDFView } from "../../Holders/HoldersView/HoldersPDFView";
import { usePDF } from "@react-pdf/renderer";
import { useGetDocuments } from "../../../hooks/useGetDocuments";
import { DetailCard } from "../../../components/DetailCard";
import { useFileDownloader } from "../../../hooks/useFileDownloader";


interface DriverViewDialogProps {
  driver: Driver;
  openView: boolean;
  onClose?: () => void;
}

export const DriversViewDialog = ({
  driver,
  openView,
  onClose,
}: DriverViewDialogProps) => {
  const [driverDocs, setDriverDocs] = useState<DriverDocument[]>([]);
  const [instance, update] = usePDF({ document: <HolderPDFView holderData={driver}/> });
  const { driverDocuments } = useGetDocuments();
  const downloadFile = useFileDownloader();

  useEffect(() => {
    driverDocuments(driver.documentNumber).then((res) => {
      setDriverDocs(res);
    });
  }, [driver, driverDocuments]);

  return (
    <ViewDialog
      open={openView}
      onClose={onClose}
      title="Detalles del conductor"
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
        width: "70vw",
        minHeight: "50vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "rgb(244 245 250)",
        paddingBottom: "50px",
      }}
      scrollDialog="body"
    >
      <Card
        sx={{
          minWidth: "60%",
          boxShadow: "rgba(58, 53, 65, 0.1) 0px 2px 10px 0px",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardHeader
            title={`${driver.firstName} ${driver.lastName}`}
            subheader={`${driver.email} / ${driver.cellphone}`}
            sx={{ width: "80%" }}
          />
          <CardMedia
            component="img"
            sx={{ width: 100, borderRadius: "50%", margin: "10px" }}
            image={`${config.server_url}${driver.avatar.replace(
              "public/",
              ""
            )}`}
            alt={`Avatar of ${driver.firstName}`}
          />
        </Box>
        <CardContent>
          <List>
            <ListItem divider={true}>
              <ListItemText
                primary="Tipo Documento"
                secondary={driver.documentType.description}
                sx={{ width: "30%" }}
              />
              <ListItemText
                primary="Nro. Documento"
                secondary={driver.documentNumber}
                sx={{ width: "30%" }}
              />
            </ListItem>
            <ListItem divider={true}>
              <ListItemText
                primary="Código Conductor"
                secondary={driver.driverCode.description}
                sx={{ width: "45%" }}
              />
              <ListItemText
                primary="Años de experiencia"
                secondary={driver.experienceYears}
                sx={{ width: "45%" }}
              />
            </ListItem>
            <ListItem divider={true}>
              <ListItemText
                primary="Categoria Licencia"
                secondary={driver.licenceCategory.description}
                sx={{ width: "45%" }}
              />
              <ListItemText
                primary="Fecha Exp. Licencia"
                secondary={dateFormatter.format(
                  new Date(driver.licenceDueDate)
                )}
                sx={{ width: "45%" }}
              />
            </ListItem>
            <ListItem divider={true}>
              <ListItemText
                primary="Ciudad"
                secondary={driver.city.description}
                sx={{ width: "45%" }}
              />
              <ListItemText
                primary="Dirección"
                secondary={driver.address}
                sx={{ width: "45%" }}
              />
            </ListItem>
            {driver.bankCertification !== "3" && (
              <>
                <ListItem divider={true}>
                  <ListItemText
                    primary="Cert. Bancaria"
                    secondary={driver.bankCertification === "1" ? "Si" : "No"}
                    sx={{ width: "45%" }}
                  />
                  <ListItemText
                    primary="Banco"
                    secondary={driver.bank.description}
                    sx={{ width: "45%" }}
                  />
                </ListItem>
                <ListItem divider={true}>
                  <ListItemText
                    primary="Rut"
                    secondary={driver.rut === "1" ? "Si" : "No"}
                    sx={{ width: "45%" }}
                  />
                  <ListItemText
                    primary="Rut con Actividad"
                    secondary={driver.hasActivityRut === "1" ? "Si" : "No"}
                    sx={{ width: "45%" }}
                  />
                </ListItem>
              </>
            )}
            <ListItem>
              <ListItemText
                primary="Autorización Saldos y Anticipos"
                secondary={driver.advancePayment === "1" ? "Si" : "No"}
                sx={{ width: "45%" }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <DetailCard cardTitle={"Documentos"} cardWidth={"35%"}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {driverDocs.map((driverDoc) => {
            return (
              <ListItem
                key={driverDoc.id}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="start"
                    aria-label="download"
                    onClick={() =>
                      downloadFile(
                        driverDoc.documentPath.toString().replace("public/", "")
                      )
                    }
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={driverDoc.documentList.documentDescription}
                  secondary={driverDoc.observation}
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
        download={`${driver.firstName}_${driver.lastName}.pdf`}
      >
        <PrintIcon />
      </Fab>
    </ViewDialog>
  );
};
