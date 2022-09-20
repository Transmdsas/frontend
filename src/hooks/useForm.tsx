import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNextStep, setStepperUI } from "../actions/Actions";
import { fileType } from "../types/Types";
import { createObjets } from "../utils/createObjets";
import { useNavigate } from "react-router-dom";

interface Form {
  inputs: any[];
  store: any;
  url: string;
  step: number;
}

export const useForm = (inputs: any, store: any, url: string, step: number) => {
  const initialForm = createObjets(inputs);
  const dispatch = useDispatch();
  const steps = useSelector((store: any) => store.SteperReducer);
  const setNextStep = steps.find((data: any) => data.id === step + 1).link;
  console.log({ setNextStep });
  const navigate = useNavigate();
  const [form, setForm] = React.useState(initialForm);
  const [response, setResponse] = React.useState<any>({});
  const [openPopUp, setOpenPopUp] = React.useState(true);

  const handleClose = () => {
    setOpenPopUp(false);
    dispatch(setStepperUI(step));
    dispatch(setNextStep(step + 1));
    navigate(`/vehiculos/${setNextStep}`);
  };

  const handleCloseByError = () => {
    setOpenPopUp(false);
    navigate(`/vehiculos${setNextStep}`);
  };

  //handle de image upload
  const handleSave = (e: any) => {
    //upload data to the server

    validateFields()
      .then((data) => allowPost(data))
      .then((data) => sendData(data));
  };

  const sendData = (isAllowed: boolean) => {
    console.log(isAllowed);
    const formData = new FormData();
    if (isAllowed) {
      form.forEach((data: any) => {
        if (data.file === fileType.file) {
          return formData.append(data.name, data.value, data.value.imgName);
        } else if (data.file === fileType.array) {
          return formData.append(data.name, JSON.stringify(data.value));
        } else {
          return formData.append(data.name, data.value);
        }
      });
      axios({
        method: "post",
        url: `https://transmd.herokuapp.com/api/v1/${url}`,
        data: formData,
      })
        .then((data) => setResponse(data))
        .catch((error) => setResponse(error));
      // console.log(...formData);
    } else {
      console.log("missing things...");
    }
  };

  const handleChange = (e: any) => {
    const verify = verifyIfnotRepeated(e.target.value);
    console.log(verify);
    setForm((data: any) =>
      data.map((d: any) => {
        if (
          d.name === e.target.name &&
          d.file !== fileType.number &&
          d.file !== fileType.array &&
          !d.charlimit &&
          !d.charMinimum &&
          !d.isRepited &&
          !d.activate
        ) {
          return {
            ...d,
            value: e.target.value,
            error: false,
          };
        } else if (d.name === e.target.name && d.activate) {
          return {
            ...d,
            value: e.target.value,
            error: false,
          };
        } else if (d.name === e.target.name && d.file === fileType.number) {
          return {
            ...d,
            value: parseInt(e.target.value),
            error: false,
          };
        } else if (d.name === e.target.name && d.file === fileType.number) {
          return {
            ...d,
            value: parseInt(e.target.value),
            error: false,
          };
        } else if (
          d.name === e.target.name &&
          e.target.value.length > d.charlimit
        ) {
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `No puede tener mas de ${d.charlimit} caracteres.`,
          };
        } else if (verify && d.name === e.target.name) {
          console.log("se cumple");
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `${e.target.value} ya existe en la base de datos`,
          };
        } else if (
          (d.name === e.target.name && e.target.value.length === d.charlimit) ||
          (d.name === e.target.name &&
            e.target.value.length === d.charMinimum) ||
          (d.name === e.target.name && e.target.value.length === 0)
        ) {
          return {
            ...d,
            value: e.target.value,
            error: false,
            errorText: "",
          };
        } else if (
          d.name === e.target.name &&
          e.target.value.length < d.charMinimum
        ) {
          return {
            ...d,
            value: e.target.value,
            error: true,
            errorText: `Deben ser minimo ${d.charMinimum} caracteres.`,
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleUpload = (e: any) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    console.log(preview);
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: e.target.files[0],
            imgName: e.target.files[0].name,
            preview: preview,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleMultipleOptions = (value: any, name: any) => {
    const values: any[] = [];
    value.map((val: any) => values.push(val.value));
    console.log(values);

    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === name) {
          return {
            ...d,
            value: values,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };

  const allowPost = (form: any) => {
    const isTrue = form.filter((data: any) => data.error === true);
    console.log(isTrue.length);
    if (isTrue.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateFields = async () => {
    const error = form.map((data: any) => {
      if (data?.value.length === 0) {
        return {
          ...data,
          error: true,
          errorText: "Tiene que llenar este campo",
        };
      } else {
        return data;
      }
    });
    setForm(error);
    return error;
  };

  console.log({ form });

  const verifyIfnotRepeated = (value: any) => {
    if (store.loading === false) {
      const findRepeated = store.vehicles.filter(
        (data: any) => data.carPlate === value
      );
      if (findRepeated.length > 0) {
        return true;
      }
    }
  };

  return {
    form,
    response,
    handleSave,
    handleSubmit,
    handleMultipleOptions,
    handleChange,
    handleUpload,
    handleCloseByError,
    handleClose,
    openPopUp,
    steps,
  };
};
