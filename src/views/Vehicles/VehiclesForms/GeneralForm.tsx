import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "formik";
import { Button, Grid, Stack } from "@mui/material";
import {
  DropdownField,
  InputField,
  FormContainer,
  UploadButton,
  MultiSelect,
} from "../../../components/forms";
import { AppDispatch, RootState } from "./../../../store";
import { GeneralFormProps } from "./types";
import CountrySelector from "../../../components/forms/Dropdown/CountrySelector";
import useYearRange from "../../../hooks/useYearRange";
import formInitialValues from "../FormModel/formInitialValues";
import validationSchema from "../FormModel/validationSchema";
import { resetSelectedCountry } from "../../../store/countries/countrySlice";
import { Department } from "../../../store/departments/types";

const axlesList = Array.from({ length: 14 }, (_, i) => {
  const number = i + 2;
  return { id: number, description: number.toString() };
});

export const GeneralForm = ({ formField, onSubmit }: GeneralFormProps<any>) => {
  const {
    carPlate,
    brandId,
    vehicleTypeId,
    vehicleCodeId,
    lineId,
    bodyWorkId,
    color,
    modelYear,
    serialNumber,
    netWeight,
    emptyWeight,
    repoweredTo,
    axles,
    propertyCard,
    fuelTypeId,
    countryId,
    frontPhoto,
    backPhoto,
    rightPhoto,
    leftPhoto,
    destinations,
  } = formField;

  const navigate = useNavigate();
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );
  const departments: Department[] = useSelector(
    (state: RootState) => state.countries.departments
  );
  const [vehicleDestinations, setVehicleDestinations] = useState<number[]>();
  const dispatch = useDispatch<AppDispatch>();
  const yearsList = useYearRange();

  const handleSubmit = (formValues: any, actions: any) => {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (key !== "destinations") {
        formData.append(key, formValues[key]);
      }
    });
    if (vehicleDestinations) {
      vehicleDestinations.forEach((destination) => {
        formData.append("destinations", destination.toString());
      });
    }
    onSubmit(formData, actions);
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const onCancel = () => {
    dispatch(resetSelectedCountry());
    navigate("/vehiculos");
  };

  const handleDestinationChange = (selectedDestinations: number[]) => {
    setVehicleDestinations(selectedDestinations);
  };

  return (
    <React.Fragment>
      <FormContainer
        initialValues={formInitialValues}
        validationSchema={validationSchema[0]}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                p: 2,
                mt: 3,
                mb: 3,
                justifyContent: "initial",
              }}
            >
              <InputField
                label={carPlate.label}
                name={carPlate.name}
                type={"text"}
              />
              <DropdownField
                name={brandId.name}
                label={brandId.label}
                parameterid={1}
              />
              <DropdownField
                name={vehicleTypeId.name}
                label={vehicleTypeId.label}
                parameterid={2}
              />
              <DropdownField
                name={vehicleCodeId.name}
                label={vehicleCodeId.label}
                parameterid={3}
              />
              <InputField
                label={propertyCard.label}
                name={propertyCard.name}
                type={"text"}
              />
              <DropdownField
                name={lineId.name}
                label={lineId.label}
                parameterid={4}
              />
              <DropdownField
                name={bodyWorkId.name}
                label={bodyWorkId.label}
                parameterid={5}
              />
              <InputField label={color.label} name={color.name} type={"text"} />
              <DropdownField
                label={modelYear.label}
                name={modelYear.name}
                data={yearsList}
              />
              <InputField
                label={serialNumber.label}
                name={serialNumber.name}
                type={"text"}
              />
              <InputField
                label={netWeight.label}
                name={netWeight.name}
                type={"text"}
              />
              <InputField
                label={emptyWeight.label}
                name={emptyWeight.name}
                type={"text"}
              />
              <DropdownField
                label={repoweredTo.label}
                name={repoweredTo.name}
                data={yearsList}
              />
              <DropdownField
                name={axles.name}
                label={axles.label}
                data={axlesList}
              />
              <DropdownField
                name={fuelTypeId.name}
                label={fuelTypeId.label}
                parameterid={6}
              />
              <CountrySelector
                name={countryId.name}
                label={countryId.label}
                value={selectedCountry || null}
              />
              <MultiSelect
                label={destinations.label}
                onchange={handleDestinationChange}
                name={destinations.name}
                disabled={selectedCountry == null}
                options={departments || []}
                lg={12}
              />
              <UploadButton label={frontPhoto.label} name={frontPhoto.name} />
              <UploadButton label={backPhoto.label} name={backPhoto.name} />
              <UploadButton label={rightPhoto.label} name={rightPhoto.name} />
              <UploadButton label={leftPhoto.label} name={leftPhoto.name} />
            </Grid>

            <Grid item xs={12} alignContent={"rigth"}>
              <Stack direction="row" justifyContent="end">
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 4 }}
                  onClick={() => {
                    formikProps.resetForm();
                    onCancel();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={formikProps.isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </Form>
        )}
      />
    </React.Fragment>
  );
};
