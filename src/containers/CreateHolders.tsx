import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateHoldersFields } from "../components/CreateHoldersFields";
import { useSelector } from "react-redux";
import { InputControllerHolders } from "../utils/inputControllerHolders"
import { useForm } from "../hooks/useForm";
import DialogPopOver from "../components/DialogPopOver";




  const CreateHolders = () => {
    const store = useSelector((state: any) => state.driversReducers);
    const inputs = InputControllerHolders().createHolders;
  
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

  } = useForm(inputs, store, "holders", 1);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.createHolders.pageTitle} />
        </Grid>
        <Grid item xs={12} md={12}>
          <StepperHorizontal steps={Texts.createHolders.steps} />
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <CreateHoldersFields
          inputs={inputs}
          form={form}
          handleChange={handleChange}
          handleUpload={handleUpload}
          handleSubmit={handleSubmit}
          handleMultipleOptions={handleMultipleOptions}
        />
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

export { CreateHolders };