import React, { useEffect, useState } from "react";
import parameterService from "./../../../services/parametersService";
import { Value } from './../../../store/values/types';

import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";

export const DropdownField = ({ onchange, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const [data, setData] = useState<Value[]>([]);

  const { setValue } = helpers;

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    if (onchange) {
      onchange(value);
    }
  };

  useEffect(() => {
    const fetchValues = async () => {
      const values = (await parameterService.get(props.parameterid)).data;
      const newValues: Value[] =  values?.values?.sort((a: any, b: any) => {
        const nameA = a.description.toUpperCase(); // ignore upper and lowercase
        const nameB = b.description.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      }) || [];
      
      setData(newValues);
    };

    if (props.parameterid) {
      fetchValues().catch(console.error);
    } else {
      setData(props.data);
    }
  }, [props.data, props.parameterid]);

  return (
    <Grid item xs={12} sm={6} md={props.md || 4} lg={props.lg || 3}>
      <FormControl
        fullWidth
        error={meta.touched && Boolean(meta.error)}
        size="small"
        sx={{
          marginTop: 1,
          marginBottom: 1,
          "& .MuiInputBase-root": { borderRadius: "20px" },
          "& .Mui-disabled": { color: "darkgray" },
        }}
        disabled={props.disabled}
      >
        <InputLabel id={props.label}>{props.label}</InputLabel>
        <Select
          className="select-input"
          labelId={props.label}
          defaultValue=""
          {...field}
          {...props}
          onChange={handleChange}
        >
          {data?.map((item: any) => (
            <MenuItem key={item.description} value={item.id}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};
