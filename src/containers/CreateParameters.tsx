import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, Box, Button, Divider, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { PageTitle } from "../components/PageTitle";
import Loading from "./../components/Loading";
import { Texts } from "../utils/UiTexts";
import { Values } from "./Values";
import { createParameter } from "../services/parametersService";
import { useDispatch } from "react-redux";
import { setParameters } from "../actions/Actions";

interface ValueRow {
  // id?: number;
  description?: string;
  parameterId?: number;
  // createdAt?: Date;
  // updatedAt?: Date;
}

const CreateParameters = () => {
  const parameterValue = useRef<HTMLInputElement>(null);
  const valueInput = useRef<HTMLInputElement>(null);
  const [valueRows, setValueRows] = useState<ValueRow[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateParameterValue = () => {
    if (parameterValue?.current?.value === "") {
      alert("Debe ingresar primero el valor del parametro a crear");
      return false;
    }
    return true;
  };

  const validateValues = () => {
    console.log(valueRows);

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

    const newValue: ValueRow = {
      // id: 0,
      description: valueInput?.current?.value || "",
      parameterId: 0,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };

    setValueRows((prev) => [...prev, newValue]);

    if (valueInput.current) valueInput.current.value = "";
  };

  const handleSave = async () => {
    if (!validateParameterValue() || !validateValues()) return;
    setLoading(true);
    try {
      if (parameterValue.current?.value) {
        const newParameter = await createParameter(parameterValue.current?.value);
        
        valueRows.forEach((value) => {
          value.parameterId = newParameter.id;
        });

        const valueResponse = await axios({
          method: "post",
          url: "https://transmd.herokuapp.com/api/v1/values",
          data: valueRows,
        });

        dispatch(setParameters(newParameter));
        console.log(valueResponse);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    
    navigate("/parametros");
  };

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
