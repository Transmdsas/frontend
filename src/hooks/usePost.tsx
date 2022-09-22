import axios from "axios";
import React from "react";

export const usePost = (initialForm: any[], url: string) => {
  const [form, setForm] = React.useState(initialForm);
  const [response, setResponse] = React.useState<any>({});

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
    return error;
  };

  const handleSave = () => {
    validateFields()
      .then((data) => allowPost(data))
      .then((data) => sendData(data));
  };

  const sendData = (isAllowed: boolean) => {
    console.log(isAllowed);
    const formData = new FormData();
    if (isAllowed) {
      form.forEach((data: any) => {
        if (data.value.imgName) {
          return formData.append(data.name, data.value, data.value.imgName);
        } else {
          return formData.append(data.name, data.value);
        }
      });
      axios({
        method: "post",
        url: `https://transmd.herokuapp.com/api/v1/${url}`,
        data: formData,
      })
        .then((data: any) => setResponse(data))
        .catch((error) => setResponse(error));
      // console.log(...formData);
      // dispatch(changeNextStep(step));
    } else {
      console.log("missing things...");
    }
  };

  const allowPost = (arr: any) => {
    console.log(arr);
    const findError = arr.filter((data: any) => data.error === true);
    if (findError.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleSave,
    response,
  };
};
