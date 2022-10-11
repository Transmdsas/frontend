import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, MultilineField } from "../components/forms";
import { PageTitle } from "../components/PageTitle";
import StepperHorizontal from "../components/Stepper";
import { TransMDcontext } from "../context/TransMDcontext";
import { Texts } from "../utils/UiTexts";

export const Communications = () => {
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

  const handleChange = (e: any) => {
  };
  const handleSubmit = (e: any) => {
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {(response?.status || response.response?.data) && (
        <DialogPopOver
          status={response?.status || response.response?.data}
          handleClose={handleClose}
          handleCloseByError={handleCloseByError}
          open={openPopUp}
        />
      )} */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.Tecnomecanics.pageTitle} />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <StepperHorizontal steps={steps} />
        </Grid> */}
         <StepperHorizontal
            steps={vehiclesStepper}
            handleClickSteeper={handleClickSteeper}
          />
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={5} flexWrap="wrap">
          <InputField
            size={4}
            label={"Web Satelital"}
            name={"web"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("controlNumber")}
            // errorMessage={findErrorMessage("controlNumber")}
          />
          <InputField
            size={4}
            label={"Usuario"}
            name={"user"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
          <InputField
            size={4}
            label={"Clave"}
            name={"pass"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
           <InputField
            size={4}
            label={"Otras opciones"}
            name={"options"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
           <InputField
            size={4}
            label={"Teléfono # 1"}
            name={"phone_1"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
           <InputField
            size={4}
            label={"Teléfono # 2"}
            name={"phone_2"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
           <MultilineField
            size={12}
            label={"Observaciones"}
            name={"observations"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            rows={3}
            // error={findError("observations")}
            // errorMessage={findErrorMessage("observations")}
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
              //onClick={handleSave}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );;
};