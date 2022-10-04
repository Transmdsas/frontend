import React, { useContext } from "react";
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
import DialogPopOver from "../components/DialogPopOver";
import { TransMDcontext } from "../context/TransMDcontext";
import { useNavigate } from "react-router-dom";

export const CreateVehicles = () => {
  const { vehiclesStepper, setVehiclesStepper } = useContext(TransMDcontext);
  const navigate = useNavigate();
  const handleClickSteeper = (e: any, id: any) => {
    const STEP = vehiclesStepper.find((data: any) => data.id === id);
    console.log({ STEP });
    setVehiclesStepper((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) {
          return {
            ...data,
            selected: true,
          };
        } else {
          return {
            ...data,
            selected: false,
          };
        }
      })
    );
    navigate(STEP.link);
  };

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
    handleCloseByError,
    handleClose,
    openPopUp,
    steps,
  } = useForm(inputs, store, "vehicles", 1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {(response?.status || response.response?.data) && (
        <DialogPopOver
          status={response?.status || response.response?.data.statusCode}
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
          <StepperHorizontal
            steps={vehiclesStepper}
            handleClickSteeper={handleClickSteeper}
          />
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
