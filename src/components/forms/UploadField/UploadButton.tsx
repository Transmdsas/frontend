import * as React from "react";
import {
  Grid,
  FormHelperText,
  Paper,
  IconButton,
  InputBase,
  Chip,
} from "@mui/material";
import { Cancel, CloudUpload } from "@mui/icons-material";
import { useField } from "formik";
import { useFileDownloader } from "../../../hooks/useFileDownloader";

export const UploadButton = (props: any) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;
  const downloadFile = useFileDownloader();

  const handleDelete = () => {
    setValue("");
  };

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
          backgroundColor: "#f7f5f5",
        }}
        >
        {!meta.value || meta.value === '' || typeof meta.value === 'object' ? (
          <>
            <IconButton
              sx={{ p: "10px" }}
              aria-label="upload"
              component="label"
              color="primary"
            >
              <input
                hidden
                accept={props.accepted || "image/*,.pdf"}
                type="file"
                name={field.name}
                onChange={(newValue) => {
                  console.log(newValue.target.files![0]);
                  setValue(newValue.target.files![0]);
                }}
              />
              <CloudUpload />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={props.label || "Seleccione un archivo"}
              inputProps={{ "aria-label": "eleccione un archivo" }}
              error={meta.touched && Boolean(meta.error)}
              aria-describedby="component-error-text"
              value={meta.value?.name || ""}
              {...props}
            />
          </>
        ) : (
          <Chip
            label={meta.value?.split("/").pop()}
            onDelete={handleDelete}
            deleteIcon={<Cancel />}
            onClick={() => downloadFile(meta.value)}
            // sx={{ width: '100%' }}
          />
        )}
      </Paper>
      {meta.touched && meta.error && (
        <FormHelperText
          id="component-error-text"
          className="Mui-error"
          sx={{ pl: 2 }}
        >
          {meta.error}
        </FormHelperText>
      )}
    </Grid>
  );
};
