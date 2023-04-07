import * as React from "react";

import {
  Grid,
  FormHelperText,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useField } from "formik";

export const UploadButton = (props: any) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  return (
    <Grid item xs={12} sm={6} md={props.md || 4} lg={props.lg || 3}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "30px",
          height: "2.55em",
          mt: 1,
          backgroundColor: "#f7f5f5"
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="upload" component="label" color="primary">
            <input
              hidden
              accept={props.accepted || "image/*,.pdf"}
              type="file"
              name={field.name}
              onChange={(newValue) => {
                setValue(newValue.target.files![0]);
              }}
            />
          <CloudUpload />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Seleccione un archivo"
          inputProps={{ "aria-label": "eleccione un archivo" }}
          error={meta.touched && Boolean(meta.error)}
          aria-describedby="component-error-text"
          value={meta.value?.name}
          onChange={(newValue) => {setValue(newValue)}}
        />
      </Paper>
      {meta.touched && meta.error && (<FormHelperText id="component-error-text" className="Mui-error" sx={{pl: 2}}>{meta.error}</FormHelperText>) }

      {/* <Stack direction="column" alignItems="center" spacing={2}>
        {meta.touched && Boolean(meta.error) && (
          <Stack sx={{ width: 250, marginBottom: 2 }} spacing={2}>
            <Alert variant="outlined" severity="error">
              {meta.error}
            </Alert>
          </Stack>
        )}
        {meta.value && (
          <TextField
            value={meta.value.name}
            size="small"
            sx={{
              marginTop: 1,
              "& .MuiInputBase-root": { borderRadius: "20px" },
            }}
            disabled
            fullWidth
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
        <Button
          variant={"contained"}
          component="label"
          color="primary"
          sx={{
            borderRadius: "50px",
            mt: "4px",
          }}
          fullWidth
          startIcon={<CloudUpload />}
        >
          {props.label}
          <input
            hidden
            accept={props.accepted || "image/*,.pdf"}
            type="file"
            name={field.name}
            onChange={(newValue) => {
              console.log(meta.value, "meta value 1");
              console.log(newValue.target.files![0], "input");
              setValue(newValue.target.files![0]);
              console.log(meta.value, "meta after");
            }}
          />
        </Button>
      </Stack> */}
    </Grid>
  );
};
