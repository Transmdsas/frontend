import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { CreateVehiclesFields } from "../components/CreateVehiclesFields";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";
import axios from "axios";
import { createObjets } from "../utils/createObjets";

export const CreateVehicles = () => {
  const inputs = InputControllerVehicles().createVehicles;
  const { initialForm, initialApi } = createObjets(inputs);

  const [form, setForm] = React.useState(initialForm);
  const [apiData, setApiData] = React.useState(initialApi);
  const [image, setImage] = React.useState("");

  const handleClick = (e: any) => {
    validateFields();
    const validatePost = allowPost(form);
    if (validatePost) {
      console.log("fire in the hole");
      // axios({
      //   method: "post",
      //   url: "https://transmd.herokuapp.com/api/v1/vehicles",
      //   data: apiData,
      // });
    }
  };

  const handleChange = (e: any) => {
    setApiData((data: any) => ({
      ...data,
      [e.target.name]: e.target.value,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
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
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleUpload = (e: any) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: preview,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
    setImage(e.target.files[0]);
    //upload image
    let formData = new FormData();
    formData.append("file", image);
    setApiData((data: any) => ({
      ...data,
      [e.target.name]: FormData,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // validateFields();
  };

  const handleMultipleOptions = (value: any, name: any) => {
    const values: any[] = [];
    value.map((val: any) => values.push(val.value));

    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === name) {
          return {
            ...d,
            value: value,
            error: false,
          };
        } else {
          return d;
        }
      })
    );

    setApiData((data: any) => ({
      ...data,
      [name]: values,
    }));
  };

  const validateFields = () => {
    const error = form.map((data: any) => {
      if (data?.value.length === 0) {
        return { ...data, error: true };
      } else {
        return data;
      }
    });
    setForm(error);
  };

  const allowPost = (form = []) => {
    const isNotTrue = form.filter((data: any) => data.error !== true);
    if (isNotTrue.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  console.log({ apiData });

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
            onClick={handleClick}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
