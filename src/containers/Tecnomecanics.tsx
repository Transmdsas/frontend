import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StepperHorizontal from "../components/Stepper";
import { PageTitle } from "../components/PageTitle";
import { Texts } from "../utils/UiTexts";
import { Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DialogPopOver from "../components/DialogPopOver";
import { CalendarField, DropdownField, InputField, MultilineField, UploadButton } from "../components/forms";
import { acceptedFileType } from "../types/Types";
import dayjs from "dayjs";
import axios from "axios";
import { changeNextStep } from "../actions/Actions";
import { useSteps } from "../hooks/useSteps";
import { TransMDcontext } from "../context/TransMDcontext";
import { useNavigate } from "react-router-dom";

const sessionID = sessionStorage.getItem("carPlate");
console.log({ sessionID });

const defaultDropdownValues = [
  {
    value: 1,
    label: "Pick Up",
  },
  {
    value: 2,
    label: "Camion",
  },
];
const initialForm = [
  {
    name: "carPlate",
    value: sessionID ? sessionID : "",
    error: false,
    errorText: "",
  },
  { name: "controlNumber", value: "", error: false, errorText: "" },
  { name: "runtNumber", value: "", error: false, errorText: "" },
  { name: "evidence", value: "", error: false, errorText: "" },
  { name: "dueDate", value: "", error: false, errorText: "" },
  { name: "diagnosticCenterId", value: "", error: false, errorText: "" },
  { name: "observations", value: "", error: false, errorText: "" },
];

export const Tecnomecanics = () => {
  // const [technoForms, setTechnoForms] = React.useState(initialForm);
  // const [calendar, setCalendar] = React.useState(dayjs());
  // const [diagnosticId, setDiagnosticId] = React.useState("");
  // const [response, setResponse] = React.useState<any>({});
  // const dispatch: any = useDispatch();

  // const { handleClose, handleCloseByError, openPopUp, steps } = useSteps(
  //   2,
  //   technoForms
  // );

  const { vehiclesStepper, setVehiclesStepper } = useContext(TransMDcontext);
  const navigate = useNavigate();
  const handleClickSteeper = (e: any, id: any) => {
    const STEP = vehiclesStepper.find((data: any) => data.id === id);
    console.log({ STEP });
    setVehiclesStepper((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) {
          return {
            ...data,
            selected: true,
          };
        } else {
          return {
            ...data,
            selected: false,
          };
        }
      })
    );

    navigate(STEP.link);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
    
  const handleChangeCalendar = (e: any) => {
    // setCalendar(dayjs(e.$d));
    // setTechnoForms((prev) =>
    //   prev.map((data) => {
    //     if (data.name === "dueDate") {
    //       return {
    //         ...data,
    //         value: e.$d,
    //       };
    //     } else {
    //       return data;
    //     }
    //   })
    // );
  };

  const handleChange = (e: any) => {
    // if (e.target.name === "diagnosticCenterId") {
    //   setDiagnosticId(e.target.value);
    // }
    // setTechnoForms((prev) =>
    //   prev.map((res: any) => {
    //     if (e.target.name === res.name) {
    //       return {
    //         ...res,
    //         value: e.target.value,
    //         error: false,
    //       };
    //     } else {
    //       return res;
    //     }
    //   })
    // );
  };

  const handleUpload = (e: any) => {
  //   const preview = URL.createObjectURL(e.target.files[0]);
  //   console.log(preview);
  //   setTechnoForms((data: any) =>
  //     data.map((d: any) => {
  //       if (d.name === e.target.name) {
  //         return {
  //           ...d,
  //           value: e.target.files[0],
  //           imgName: e.target.files[0].name,
  //           preview: preview,
  //           error: false,
  //         };
  //       } else {
  //         return d;
  //       }
  //     })
  //   );
  };

  // const validateFields = async () => {
  //   const error = technoForms.map((data: any) => {
  //     if (data?.value.length === 0) {
  //       return {
  //         ...data,
  //         error: true,
  //         errorText: "Tiene que llenar este campo",
  //       };
  //     } else {
  //       return data;
  //     }
  //   });
  //   setTechnoForms(error);
  //   return error;
  // };

  // const handleSave = () => {
  //   validateFields()
  //     .then((data) => allowPost(data))
  //     .then((data) => sendData(data));
  // };

  // const sendData = (isAllowed: boolean) => {
  //   console.log(isAllowed);
  //   const formData = new FormData();
  //   if (isAllowed) {
  //     technoForms.forEach((data: any) => {
  //       if (data.value.imgName) {
  //         return formData.append(data.name, data.value, data.value.imgName);
  //       } else {
  //         return formData.append(data.name, data.value);
  //       }
  //     });
  //     axios({
  //       method: "post",
  //       url: "https://transmd.herokuapp.com/api/v1/technomechanics",
  //       data: formData,
  //     })
  //       .then((data) => setResponse(data))
  //       .catch((error) => setResponse(error));
  //     // console.log(...formData);
  //     dispatch(changeNextStep(2));
  //   } else {
  //     console.log("missing things...");
  //   }
  // };

  // const allowPost = (arr: any) => {
  //   console.log(arr);
  //   const findError = arr.filter((data: any) => data.error === true);
  //   if (findError.length > 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // console.log({ technoForms });
  // console.log({ response });

  // const findError = (name: any) => {
  //   return technoForms.find((data) => data.name === name)?.error;
  // };
  // const findErrorMessage = (name: any) => {
  //   return technoForms.find((data) => data.name === name)?.errorText;
  // };
    return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {(response?.status || response.response?.data) && (
        <DialogPopOver
          status={response?.status || response.response?.data}
          handleClose={handleClose}
          handleCloseByError={handleCloseByError}
          open={openPopUp}
        />
      )} */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <PageTitle title={Texts.Tecnomecanics.pageTitle} />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <StepperHorizontal steps={steps} />
        </Grid> */}
         <StepperHorizontal
            steps={vehiclesStepper}
            handleClickSteeper={handleClickSteeper}
          />
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={5} flexWrap="wrap">
          <InputField
            size={6}
            label={"Numero de control"}
            name={"controlNumber"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("controlNumber")}
            // errorMessage={findErrorMessage("controlNumber")}
          />
          <InputField
            size={3}
            label={"Numero de consecutivo RUNT"}
            name={"runtNumber"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
          <UploadButton
            text={"Cargar Archivo"}
            handleUpload={handleUpload}
            accepted={acceptedFileType.pdf}
            name="evidence"
            size={3}
            icon={"file_upload"}
            // error={findError("evidence")}
          />
          <CalendarField
            handleChangeCalendar={handleChangeCalendar}
            label={"Fecha de vencimiento"}
            name="dueDate"
            size={6}
            // value={calendar}
            // error={findError("dueDate")}
            // errorMessage={findErrorMessage("dueDate")}
          />
          <DropdownField
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // value={diagnosticId}
            label={"Centro de diagnóstico Automotriz"}
            name={"diagnosticCenterId"}
            size={6}
            dropdownValues={defaultDropdownValues}
            // error={findError("diagnosticCenterId")}
            // errorMessage={findErrorMessage("diagnosticCenterId")}
          />
          <MultilineField
            size={12}
            label={"Observaciones"}
            name={"observations"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            rows={5}
            //error={findError("observations")}
            //errorMessage={findErrorMessage("observations")}
          />
        </Grid>
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
              //onClick={handleSave}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
