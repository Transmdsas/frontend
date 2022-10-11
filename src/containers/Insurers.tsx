import React, { useContext } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CalendarField, DropdownField, InputField, MultilineField, UploadButton } from "../components/forms";
import DialogPopOver from "../components/DialogPopOver";
import { PageTitle } from "../components/PageTitle";
import StepperHorizontal from "../components/Stepper";
import dayjs from "dayjs";
import { changeNextStep } from "../actions/Actions";
import { Texts } from "../utils/UiTexts";
import { acceptedFileType } from "../types/Types";
import { useSteps } from "../hooks/useSteps";
import { Text } from "../components/Text";
import { InsuranceNumber } from "../components/InsuranceNumber";
import { TransMDcontext } from "../context/TransMDcontext";
import { useNavigate } from "react-router-dom";

const sessionID = sessionStorage.getItem("carPlate");

const insuranceCompanyIdValues = [
  {
    value: 1,
    label: "Company1",
  },
  {
    value: 2,
    label: "Company2",
  },
];
const initialForm = [
  {
    name: "carPlate",
    value: sessionID ? sessionID : "",
    error: false,
    errorText: "",
  },
  { name: "insuranceCompanyId", value: "", error: false, errorText: "" },
  { name: "insuranceNumber", value: "", error: false, errorText: "" },
  { name: "evidence", value: "", error: false, errorText: "" },
  { name: "dueDate", value: "", error: false, errorText: "" },
  { name: "otherInsurers", value: [], error: false, errorText: "" },
  { name: "observations", value: "", error: false, errorText: "" },
];

const InitialFormArr = [
  {
    name: "insuranceTypeId",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuranceNumber",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "dueDate",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuranceCompanyId",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuredValue",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "observations",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "evidence",
    value: "",
    error: false,
    errorText: "",
  },
];

const initialObject = InitialFormArr.map((data) => {
  return {
    [data.name]: data.value,
  };
}).reduce((a: any, b: any) => {
  return { ...a, ...b };
});

export const Insurers = () => {
  // const [insuranceForm, setInsuranceForm] = React.useState(initialForm);
  // const [calendar, setCalendar] = React.useState(dayjs());
  // const [diagnosticId, setDiagnosticId] = React.useState("");
  // const [response, setResponse] = React.useState<any>({});
  // const [insurersCount, setInsurersCount] = React.useState(1);
  // const [insideForms, setInsideForms] = React.useState({});
  // const dispatch: any = useDispatch();
  // const insideArr = [];
  // console.log({ insideForms });
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
  // const insurers = new Array(insurersCount).fill(initialObject);

  // const [insurersArrays, setInsurersArray] = React.useState([]);

  // const { handleClose, handleCloseByError, openPopUp, steps } = useSteps(
  //   2,
  //   insuranceForm
  // );

  // const initiate = initialForm.map((data) => {
  //   if (data.name === "otherInsurers") {
  //     return {
  //       ...data,
  //       value: insurersArrays,
  //     };
  //   } else {
  //     return data;
  //   }
  // });

  // const [form, useForm] = React.useState(initiate);

  // console.log({ form });
  // console.log({ insurersArrays });

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  // };

  const handleChangeCalendar = (e: any) => {
    // setCalendar(dayjs(e.$d));
    // setInsuranceForm((prev) =>
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
    // setInsuranceForm((prev) =>
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

  // const handleClick = (e: any) => {
  //   setInsurersCount((prev) => prev + 1);
  //   // setInsurersArray(insurers);
  // };

  const handleUpload = (e: any) => {
  //   const preview = URL.createObjectURL(e.target.files[0]);
  //   setInsuranceForm((data: any) =>
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
  //   const error = insuranceForm.map((data: any) => {
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
  //   setInsuranceForm(error);
  //   return error;
  // };

  // const handleSave = () => {
  //   validateFields()
  //     .then((data) => allowPost(data))
  //     .then((data) => sendData(data));
  // };

  // const sendData = (isAllowed: boolean) => {
  //   const formData = new FormData();
  //   if (isAllowed) {
  //     insuranceForm.forEach((data: any) => {
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
  //     dispatch(changeNextStep(2));
  //   } else {
  //     console.log("missing things...");
  //   }
  // };

  // const allowPost = (arr: any) => {
  //   const findError = arr.filter((data: any) => data.error === true);
  //   if (findError.length > 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const findError = (name: any) => {
  //   return insuranceForm.find((data) => data.name === name)?.error;
  // };
  // const findErrorMessage = (name: any) => {
  //   return insuranceForm.find((data) => data.name === name)?.errorText;
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
          <PageTitle title={Texts.Insurers.pageTitle} />
        </Grid>
        <Grid item xs={12} md={12}>
          {/* <StepperHorizontal steps={steps} /> */}
          <StepperHorizontal
            steps={vehiclesStepper}
            handleClickSteeper={handleClickSteeper}
          />
        </Grid>
      </Grid>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Box>
        <Grid container spacing={5} flexWrap="wrap">
          <Grid item xs={12} md={12}>
            <Text
              title="SOAT"
              color="gray"
              fontSize={"15px"}
              weight={"200px"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} flexWrap="wrap">
          <DropdownField
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            //value={diagnosticId}
            label={"Aseguradora"}
            name={"insuranceCompanyId"}
            size={4}
            dropdownValues={insuranceCompanyIdValues}
            // error={findError("insuranceCompanyId")}
            // errorMessage={findErrorMessage("insuranceCompanyId")}
          />
          <CalendarField
            handleChangeCalendar={handleChangeCalendar}
            label={"Fecha de vencimiento"}
            name="dueDate"
            size={4}
            // value={calendar}
            // error={findError("dueDate")}
            // errorMessage={findErrorMessage("dueDate")}
          />
          <InputField
            size={4}
            label={"Numero de póliza"}
            name={"runtNumber"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // error={findError("runtNumber")}
            // errorMessage={findErrorMessage("runtNumber")}
          />
          <MultilineField
            size={12}
            label={"Observaciones"}
            name={"observations"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            rows={3}
            // error={findError("observations")}
            // errorMessage={findErrorMessage("observations")}
          />
          <UploadButton
            text={"Cargue Soat"}
            handleUpload={handleUpload}
            accepted={acceptedFileType.pdf}
            name="evidence"
            size={3}
            icon={"file_upload"}
            //error={findError("evidence")}
            btnColor={"#4F6192"}
          />
        </Grid>
        {/* {insurers.map((data, i) => {
          return <InsuranceNumber key={i} />;
        })} */}
        <Divider
          variant="fullWidth"
          sx={{ marginBottom: "32px", marginTop: "42px" }}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent={{ md: "start", xs: "center" }}
          marginTop={2}
        >
          <Grid item xs={4} md={3}>
            <Button
              color={"primary"}
              variant={"contained"}
              //onClick={handleClick}
              sx={{
                borderRadius: 10,
                width: "90%",
                height: 35,
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Agregar otra Póliza
            </Button>
          </Grid>
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
