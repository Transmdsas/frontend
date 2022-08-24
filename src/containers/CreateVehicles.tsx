import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import InputForm from "../components/Input";
import { Texts } from "../utils/UiTexts";
import ImageCard from "../components/ImageCard";
import { useSelector } from "react-redux";
import { Divider, Button } from "@mui/material";

export const CreateVehicles = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  const store = useSelector((data) => data);
  console.log(store);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title="Información general del Vehículo" />
        </Grid>
        <Grid item xs={12} md={12}>
          <StepperHorizontal steps={Texts.createVehicle.steps} />
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={3}>
          {Texts.createVehicle.fields.map((input, i) => {
            return (
              <Grid item xs={12} md={3} key={i}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  <InputForm label={input} fullWidth={true} />
                </Box>
              </Grid>
            );
          })}

          <Grid item xs={12} md={9}>
            <Divider variant="fullWidth" sx={{ marginBottom: "32px" }} />
            <Box>
              <InputForm
                label="Observaciones"
                multiline={true}
                fullWidth={true}
                rows={8}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ position: "relative", top: "-65px", md: {} }}
          >
            <ImageCard
              image={""}
              imageTitle={Texts.createVehicle.default_image_title}
              buttonTexts={Texts.createVehicle.upload_button}
              height={250}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs={6} md={1}>
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  borderRadius: 10,
                  width: "100%",
                  height: 35,
                  mb: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                ATRAS
              </Button>
            </Grid>
            <Grid item xs={6} md={1}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: 10,
                  width: "100%",
                  height: 35,
                  mb: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
