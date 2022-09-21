import React, { useRef, useState } from "react";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Values } from "./Values";
import { Container } from "@mui/system";

// const rows: any = [
//   {
//     id: 1,
//     description: "AB1",
//     parameterId: 1,
//     createdAt: new Date("2022-09-19T02:57:05.063Z"),
//     updatedAt: new Date("2022-09-19T02:57:05.064Z"),
//   },
//   {
//     id: 2,
//     description: "AB2",
//     parameterId: 1,
//     createdAt: new Date("2022-09-19T02:57:09.203Z"),
//     updatedAt: new Date("2022-09-19T02:57:09.203Z"),
//   },
//   {
//     id: 3,
//     description: "AB3",
//     parameterId: 1,
//     createdAt: new Date("2022-09-19T02:57:12.907Z"),
//     updatedAt: new Date("2022-09-19T02:57:12.908Z"),
//   },
//   {
//     id: 4,
//     description: "Volvo",
//     parameterId: 2,
//     createdAt: new Date("2022-09-19T02:57:19.967Z"),
//     updatedAt: new Date("2022-09-19T02:57:19.967Z"),
//   },
// ];
interface ValueRow {
  id?: number,
  description?: string,
  parameterId?: number,
  createdAt?: Date,
  updatedAt?: Date
};

const CreateParameters = () => {
  const parameterValue = useRef<HTMLInputElement>(null);
  const [valueRows, setValueRows] = useState<ValueRow[]>([]);
  const valueInput = useRef<HTMLInputElement>(null);

  const handleValueRow = () => {
    if(parameterValue?.current?.value === ''){
      alert('Debe ingresar primero el valor del parametro a crear');
      return;
    }

    if(valueInput?.current?.value === '')
      return;

    if(valueRows.find(r => r.description === valueInput?.current?.value)){
      alert('El valor que intenta ingresar ya fue registrado.');
      return;
    }

    const newValue: ValueRow = {
      id: 0,
      description: valueInput?.current?.value || "",
      parameterId: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setValueRows(prev => [...prev, newValue ]);
    
    if(valueInput.current)
      valueInput.current.value = '';
  }

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <PageTitle title={Texts.createParameter.pageTitle} />
        </Grid>

        <Grid item xs={2} md={2}>
          <Button
            color={"primary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: "100%",
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            // onClick={handleSave}
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button
            color={"secondary"}
            variant={"contained"}
            sx={{
              borderRadius: 10,
              width: "100%",
              height: 35,
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            Atras
          </Button>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ mb: 4, mt: 2 }} />
      <Box sx={{ mb: 5, mt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <TextField
            className="transmd__input"
            label="Parametro"
            size={"small"}
            required={true}
            name="parameter"
            focused
            inputRef = {parameterValue}
          />
          <TextField
            className="transmd__input"
            label="Agregar Valor"
            size={"small"}
            required={true}
            name="value"
            inputRef={valueInput}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              color={"primary"}
              variant={"contained"}
              sx={{
                borderRadius: 10,
                height: 35,
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={handleValueRow}
            >
              Agregar Valor
            </Button>
          </Box>
        </Grid>
      </Box>

      <Box>
        <Values rows={valueRows} />
      </Box>
    </Container>
  );
};

export { CreateParameters };
