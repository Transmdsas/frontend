import React from "react";
import { Button, Grid, Stack } from "@mui/material";
import {
  DropdownField,
  InputField,
  CalendarField,
  CheckBoxField,
  FormContainer,
} from "../../../components/forms";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { City } from "../../../store/cities/types";
import { GeneralFormProps } from "./types";
import CountrySelector from "../../../components/forms/Dropdown/CountrySelector";
import DepartmentSelector from "../../../components/forms/Dropdown/DepartmentSelector";
import formInitialValues from "../FormModel/formInitialValues";
import validationSchema from "../FormModel/validationSchema";
import { Form } from "formik";
import { useNavigate } from "react-router-dom";
import { resetSelectedDepartment } from "../../../store/departments/departmentSlice";
import { resetSelectedCountry } from "../../../store/countries/countrySlice";

const selectData = [
  { description: "Si", id: "1" },
  { description: "No", id: "2" },
  { description: "No aplica", id: "3" },
];

export const GeneralForm = ({ formField, onSubmit }: GeneralFormProps<any>) => {
  const {
    firstName,
    lastName,
    documentTypeId,
    documentNumber,
    cellphone,
    email,
    birthDate,
    address,
    countryId,
    departmentId,
    cityId,
    bankCertification,
    bankId,
    rut,
    hasActivityRut,
    balances,
    advances,
  } = formField;
  const navigate = useNavigate();
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );
  const selectedDepartment = useSelector(
    (state: RootState) => state.departments.selectedDepartment
  );
  const cities: City[] = useSelector(
    (state: RootState) => state.departments.cities
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (formValues: any, actions: any) => {
    console.log(formValues);
    onSubmit({...formValues}, actions);
    actions.setTouched({});
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const onCancel = () => {
    console.log("GeneralForm canceled");
    dispatch(resetSelectedCountry());
    dispatch(resetSelectedDepartment());
    navigate("/tenedores");
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
                label={firstName.label}
                name={firstName.name}
                type={"text"}
              />
              <InputField
                label={lastName.label}
                name={lastName.name}
                type={"text"}
              />
              <DropdownField
                name={documentTypeId.name}
                label={documentTypeId.label}
                parameterid={8}
              />
              <InputField
                label={documentNumber.label}
                name={documentNumber.name}
                type={"text"}
              />
              <InputField
                label={cellphone.label}
                name={cellphone.name}
                type={"tel"}
              />
              <InputField
                label={email.label}
                name={email.name}
                type={"email"}
              />
              <CalendarField
                label={birthDate.label}
                name={birthDate.name}
                minDate={"1970-01-01"}
              />
              <InputField
                label={address.label}
                name={address.name}
                type={"text"}
              />

              <CountrySelector
                name={countryId.name}
                label={countryId.label}
                value={selectedCountry || null}
              />
              <DepartmentSelector
                name={departmentId.name}
                label={departmentId.label}
                value={selectedDepartment || null}
                disabled={selectedCountry == null}
              />

              <DropdownField
                name={cityId.name}
                label={cityId.label}
                data={cities}
                disabled={selectedDepartment === null || cities.length === 0}
              />
              <Grid item />
              <DropdownField
                name={bankCertification.name}
                label={bankCertification.label}
                data={selectData}
              />
              <DropdownField
                name={bankId.name}
                label={bankId.label}
                parameterid={13}
              />
              <DropdownField
                name={rut.name}
                label={rut.label}
                data={selectData}
              />
              <DropdownField
                name={hasActivityRut.name}
                label={hasActivityRut.label}
                data={selectData}
              />
              <CheckBoxField name={balances.name} label={balances.label} />
              <CheckBoxField name={advances.name} label={advances.label} />
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
