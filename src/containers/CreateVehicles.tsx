import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateVehiclesFields } from "../components/CreateVehiclesFields";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";

export const CreateVehicles = () => {
  const inputs = InputControllerVehicles().createVehicles;

  const handleClick = (e: any) => {
    console.log(e.target);
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleUpload = (e: any) => {
    console.log(e.target.files);
  };

  const handleSubmit = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.createVehicle.pageTitle} />
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
        <CreateVehiclesFields
          inputs={inputs}
          handleChange={handleChange}
          handleUpload={handleUpload}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="end"
        marginTop={2}
      >
        <Grid item xs={12} md={2}>
          <Button
            color={"secondary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: 200,
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={handleClick}
          >
            Atras
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color={"primary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: 200,
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={handleClick}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
