import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateVehiclesFields } from "../components/CreateVehiclesFields";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";
import { inputTypes } from "../types/Types";

export const CreateVehicles = () => {
  const inputs = InputControllerVehicles().createVehicles;


  const object = inputs
  .map((data: any) => {
    if (data.kind !== inputTypes.divider) {
      return { name: data.name, value: "", error: false };
    } else {
      return;
    }
  })
  .filter((data: any) => data !== undefined);

console.log({ object });

const [form, setForm] = React.useState(object);
const [apiData, setApiData] = React.useState({})
const [previewImage, setPreviewImage] = React.useState({})

  const handleClick = (e: any) => {
    console.log(e.target);
  };

  const handleChange = (e: any) => {
    setApiData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));

    /*
     * find the 'name' inside the Object in the array
     * then change its value from "" to the selected or whateveris in the input
     */
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: e.target.value,
            error: false
            
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleUpload = (e: any) => {
    console.log(e.target.files);
    const preview = {filepreview:URL.createObjectURL(e.target.files[0])}
    setPreviewImage({filepreview:URL.createObjectURL(e.target.files[0])})
    console.log({preview})
    console.log({previewImage})
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const error = form.map((data) => {
          if (data?.value.length === 0) {
            return { ...data, error: true };
          } else {
            return data;
          }
        });
        setForm(error)
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
          form={form}
          handleChange={handleChange}
          handleUpload={handleUpload}
          handleSubmit={handleSubmit}
          image={previewImage}
        />
      </Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={{md:"end", xs: "center"}}
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
            onClick={handleClick}
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
            onClick={handleClick}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
