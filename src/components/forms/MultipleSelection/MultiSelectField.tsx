import React from "react";
import { useField } from "formik";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "#203764",
      color: "white",
      fontWeight: "medium"
    },
  },
};

export const MultiSelect = ({ onchange, data, ...props }: any) => {

  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    setValue(value);
    //setFieldValue(name, event.target.value);
    if (onchange) {
      onchange(value);
    }
  };

  return (
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
        labelId={props.label}
        multiple
        {...field}
        {...props}
        value={field.value || []}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.length > 0 &&
              selected.map((value: string) => (
                <Chip
                  key={value}
                  label={
                    data.find((dept: any) => dept.id === Number(value))
                      ?.description
                  }
                />
              ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {data.length > 0 &&
          data.map((item: any) => (
            <MenuItem key={item.description} value={item.id}>
              {item.description}
            </MenuItem>
          ))}
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
