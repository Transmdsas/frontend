import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateVehiclesFields } from "../components/CreateVehiclesFields";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";

export const CreateVehicles = () => {
  const store = useSelector((state: any) => state.vehiclesReducers);
  const inputs = InputControllerVehicles().createVehicles;
  const {
    form,
    response,
    handleSave,
    handleSubmit,
    handleMultipleOptions,
    handleChange,
    handleUpload,
  } = useForm(inputs, store, "vehicles", 1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.createVehicle.pageTitle} />
        </Grid>
        <Grid item xs={12} md={12}>
          <StepperHorizontal />
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={3}>
          <CreateVehiclesFields
            inputs={inputs}
            form={form}
            handleChange={handleChange}
            handleUpload={handleUpload}
            handleSubmit={handleSubmit}
            handleMultipleOptions={handleMultipleOptions}
          />
        </Grid>
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={{ md: "end", xs: "center" }}
        marginTop={2}
      >
        <Grid item xs={4} md={2}>
          <Button
            color={"secondary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: "90%",
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            Atras
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            color={"primary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: "90%",
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
