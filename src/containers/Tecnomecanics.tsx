import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateVehiclesFields } from "../components/CreateVehiclesFields";
import { useSelector } from "react-redux";
import { TecnomecanicaController } from "../utils/TecnomecanicaController";
import DialogPopOver from "../components/DialogPopOver";
import { useForm } from "../hooks/useForm";

export const Tecnomecanics = () => {
  const store = useSelector((state: any) => state.vehiclesReducers);
  const inputs = TecnomecanicaController().tecnomecanica;
  const {
    form,
    response,
    handleSave,
    handleSubmit,
    handleMultipleOptions,
    handleChange,
    handleUpload,
    handleCloseByError,
    handleClose,
    openPopUp,
    steps,
  } = useForm(inputs, store, "technomechanics", 2);

  console.log("response: ", response.response?.data.statusCode);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {response.response?.data && (
        <DialogPopOver
          status={response.response?.data.statusCode}
          handleClose={handleClose}
          handleCloseByError={handleCloseByError}
          open={openPopUp}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.createVehicle.pageTitle} />
        </Grid>
        <Grid item xs={12} md={12}>
          <StepperHorizontal steps={steps} />
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={5} flexWrap="wrap">
          <CreateVehiclesFields
            inputs={inputs}
            form={form}
            handleChange={handleChange}
            handleUpload={handleUpload}
            handleSubmit={handleSubmit}
            handleMultipleOptions={handleMultipleOptions}
          />
        </Grid>
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
    </Box>
  );
};
