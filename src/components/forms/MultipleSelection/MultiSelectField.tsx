import React from "react";
import { useField, useFormikContext } from "formik";
import FormControl from "@mui/material/FormControl";
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AutocompleteOption {
  id: number;
  description: string;
}

interface FormikAutocompleteProps
  extends Omit<
    AutocompleteProps<AutocompleteOption, true, false, false>,
    "name" | "onChange" | "renderInput"
  > {
  name: string;
  label: string;
  onchange?: (value: number[]) => void;
  md?: number;
  lg?: number;
}

export const MultiSelect: React.FC<FormikAutocompleteProps> = ({
  name,
  label,
  options,
  onchange,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField<AutocompleteOption[]>(name);

  const handleChange = (
    _: React.SyntheticEvent,
    value: AutocompleteOption[]
  ) => {
    const ids = value.map((item) => item.id);
    setFieldValue(name, value);
    if (onchange) {
      onchange(ids);
    }
  };

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
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={options}
          getOptionLabel={(option) => option.description}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.description}
            </li>
          )}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={meta.touched && Boolean(meta.error)}
              size="small"
            />
          )}
        />
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default MultiSelect;
