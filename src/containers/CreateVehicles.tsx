import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import ImageCard from "../components/ImageCard";
import { useDispatch } from "react-redux";
import { Divider, Button, TextField, MenuItem } from "@mui/material";
import { InputsControllers } from "../utils/inputsControllers";
import { inputTypes } from "../types/Types";
import { setInputs } from "../actions/Actions";

export const CreateVehicles = () => {
  const [form, setForm] = React.useState({});
  const [select, setSelected] = React.useState("");
  const [selectedInputs, setSelectedInputs] = React.useState([{}]);
  let selected: any[] = [];

  const formsData = InputsControllers();
  const forms = formsData.createVehicles;

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    console.log(e.target.name);

    setSelectedInputs(e.target.name);
    selected.push();

    setSelected(e.target.value);

    setForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  console.log({ selected });

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
        <Grid container spacing={3}>
          {forms.map((form) => {
            if (form.kind === inputTypes.input) {
              return (
                <Grid item xs={12} md={form.size} key={form.label}>
                  <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={(e: any) => handleSubmit(e)}
                  >
                    <TextField
                      label={form.label}
                      size={"medium"}
                      required={true}
                      name={form.name}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
              );
            } else if (form.kind === inputTypes.select) {
              return (
                <Grid item xs={12} md={form.size} key={form.label}>
                  <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={(e: any) => handleSubmit(e)}
                  >
                    <TextField
                      label={form.label}
                      select
                      size={"medium"}
                      name={form.name}
                      value={select}
                      fullWidth={true}
                      onChange={handleChange}
                    >
                      {form.dropdownValues?.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
              );
            } else if (form.kind === inputTypes.multiline) {
              return (
                <Grid item xs={12} md={form.size} key={form.label}>
                  <Divider variant="fullWidth" sx={{ marginBottom: "32px" }} />
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: any) => handleSubmit(e)}
                  >
                    <TextField
                      label={form.label}
                      name={form.name}
                      multiline={true}
                      fullWidth={true}
                      rows={form.rows}
                    />
                  </Box>
                </Grid>
              );
            }
          })}

          {/* select */}

          <Grid item xs={12} md={3}>
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
