import React, { useState } from "react";
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
  const initialRows: ValueRow[] = [];
  const [parameter, setParameter] = useState({ description: "" });
  const [valueRows, setValueRows] = useState(initialRows);

  const handleParameter = (e: any) => {
    console.log(e.target.value);
    setParameter({ description: e.target.value });
  };

  const handleValue = (e:any) => {
    const newValue: ValueRow = {
      id: 0,
      description: e.target.value,
      parameterId: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    initialRows.push(...newValue);
    setValueRows(initialRows);
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
            onBlur={handleParameter}
          />
          <TextField
            className="transmd__input"
            label="Agregar Valor"
            size={"small"}
            required={true}
            name="value"
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
              onClick={handleValue}
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
