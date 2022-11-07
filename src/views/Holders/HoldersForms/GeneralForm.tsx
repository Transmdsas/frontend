import { Grid, Typography } from "@mui/material";
import React from "react";
import { DropdownField, InputField } from "../../../components/forms";

const selectData = [
  { label: "Bogotá", value: "10" },
  { label: "Chia", value: "20" },
  { label: "Mosquera", value: "30" },
  { label: "Cajica", value: "40" },
];

export const GeneralForm = (props: any) => {
  const {
    formField: {
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
    },
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Información general
      </Typography>
      <Grid container spacing={3}>
        <InputField label={firstName.label} name={firstName.name} />
        <InputField label={lastName.label} name={lastName.name} />
        <DropdownField
          name="documentTypeId"
          label="Tipo de Documento*"
          data={selectData}
        />
      </Grid>
    </React.Fragment>
  );
};
