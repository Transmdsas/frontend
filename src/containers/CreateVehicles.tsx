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
import FormData from "form-data";
import { fileType } from "../types/Types";
import { useSelector } from "react-redux";

export const CreateVehicles = () => {
  const store = useSelector((state: any) => state.vehiclesReducers);
  const inputs = InputControllerVehicles().createVehicles;
  const initialForm = createObjets(inputs);

  const [form, setForm] = React.useState(initialForm);
  const [repeated, setRepeated] = React.useState(false);

  //handle de image upload
  const handleSave = (e: any) => {
    //upload data to the server

    validateFields()
      .then((data) => allowPost(data))
      .then((data) => sendData(data));
  };

  const sendData = (isAllowed: boolean) => {
    console.log(isAllowed);
    const formData = new FormData();
    if (isAllowed) {
      form.forEach((data: any) => {
        if (data.file === fileType.file) {
          return formData.append(data.name, data.value, data.value.imgName);
        } else if (data.file === fileType.array) {
          return formData.append(data.name, JSON.stringify(data.value));
        } else {
          return formData.append(data.name, data.value);
        }
      });
      axios({
        method: "post",
        url: "https://transmd.herokuapp.com/api/v1/vehicles",
        data: formData,
      })
        .then(console.log)
        .catch((error) => console.log(error));
      // console.log(...formData);
    } else {
      console.log("missing things...");
    }
  };

  const handleChange = (e: any) => {
    const verify = verifyIfnotRepeated(e.target.value);
    console.log(verify);
    setForm((data: any) =>
      data.map((d: any) => {
        if (
          d.name === e.target.name &&
          d.file !== fileType.number &&
          d.file !== fileType.array &&
          !d.charlimit &&
          !d.charMinimum &&
          !d.isRepited
        ) {
          return {
            ...d,
            value: e.target.value,
            error: false,
          };
        } else if (d.name === e.target.name && d.file === fileType.number) {
          return {
            ...d,
            value: parseInt(e.target.value),
            error: false,
          };
        } else if (
          d.name === e.target.name &&
          e.target.value.length > d.charlimit
        ) {
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `No puede tener mas de ${d.charlimit} caracteres.`,
          };
        } else if (verify && d.name === e.target.name) {
          console.log("se cumple");
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `${e.target.value} ya existe en la base de datos`,
          };
        } else if (
          d.name === e.target.name &&
          e.target.value.length === d.charlimit
        ) {
          return {
            ...d,
            value: e.target.value,
            error: false,
            errorText: "",
          };
        } else if (
          d.name === e.target.name &&
          e.target.value.length < d.charMinimum
        ) {
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `Deben ser minimo ${d.charMinimum} caracteres.`,
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleUpload = (e: any) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    console.log(preview);
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: e.target.files[0],
            imgName: e.target.files[0].name,
            preview: preview,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // validateFields();
  };

  const handleMultipleOptions = (value: any, name: any) => {
    const values: any[] = [];
    value.map((val: any) => values.push(val.value));
    console.log(values);

    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === name) {
          return {
            ...d,
            value: values,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };

  const allowPost = (form: any) => {
    const isTrue = form.filter((data: any) => data.error === true);
    console.log(isTrue.length);
    if (isTrue.length > 0) {
      console.log("is more than 0");
      return false;
    } else {
      console.log("no errors here");
      return true;
    }
  };

  const validateFields = async () => {
    const error = form.map((data: any) => {
      if (data?.value.length === 0) {
        return {
          ...data,
          error: true,
          errorText: "Tiene que llenar este campo",
        };
      } else {
        return data;
      }
    });
    setForm(error);
    return error;
  };

  const verifyIfnotRepeated = (value: any) => {
    if (store.loading === false) {
      const findRepeated = store.vehicles.filter(
        (data: any) => data.carPlate === value
      );
      console.log(findRepeated.length);
      if (findRepeated.length > 0) {
        return true;
      }
    }
  };

  console.log({ form });

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
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
