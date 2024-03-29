import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Backdrop, Box, Button, Container, Divider, Grid, TextField } from "@mui/material";
import { PageTitle } from "../components/PageTitle";
import Loading from "./../components/Loading";
import { Values } from "./Values";
import { AppDispatch } from "../store";
import { createParameter } from "../store/parameters/parameterSlice";
import { createValues } from "../store/values/valueSlice";
import { Value } from "../store/values/types";
import { Parameter } from "../store/parameters/types";

const CreateParameters = () => {
  const parameterValue = useRef<HTMLInputElement>(null);
  const valueInput = useRef<HTMLInputElement>(null);
  const [valueRows, setValueRows] = useState<Value[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const validateParameterValue = () => {
    if (parameterValue?.current?.value === "") {
      alert("Debe ingresar primero el valor del parametro a crear");
      return false;
    }
    return true;
  };

  const validateValues = () => {
    if (valueRows.length === 0) {
      alert("Debe ingresar primero el valor del parametro a crear");
      return false;
    }
    return true;
  };

  const handleValueRow = () => {
    if (!validateParameterValue()) return;

    if (valueInput?.current?.value === "") return;

    if (valueRows.find((r) => r.description === valueInput?.current?.value)) {
      alert("El valor que intenta ingresar ya fue registrado.");
      return;
    }

    const newValue: Value = {
      //id: 0,
      description: valueInput?.current?.value || "",
      parameterId: 0,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    setValueRows((prev) => [...prev, newValue]);

    if (valueInput.current) valueInput.current.value = "";
  };

  const handleSave = async () => {
    // if (!validateParameterValue() || !validateValues()) return;
    // setLoading(true);
    // try {
    //   if (parameterValue.current?.value) {
        
    //     const newParam: Parameter = {
    //       description: parameterValue.current?.value
    //     } 

    //     const newParameter = await dispatch(createParameter(newParam));
    //     console.log('newparam', newParameter);

    //     if(!newParameter.payload){
    //       alert("Error al guardar");
    //       throw new Error(`Error al guardar, ${newParameter.type}`);
    //     }
        
    //     // valueRows.forEach((value) => {
    //     //   value.parameterId = newParameter.payload.id;
    //     // });

    //     const newValues = await dispatch(createValues(valueRows));
    //     console.log(newValues);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // setLoading(false);
    
    // navigate("/parametros");
  };

  const returnPage = () => {
    navigate("/parametros");
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <PageTitle title='Crear Parametros' />
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
            onClick={handleSave}
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
              }
            }}
            onClick={returnPage}
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
            inputRef={parameterValue}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Loading />
      </Backdrop>
    </Container>
  );
};

export { CreateParameters };
