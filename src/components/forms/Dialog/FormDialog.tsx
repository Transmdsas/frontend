import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";

interface FormDialogProps<T> {
  open: boolean;
  title: string;
  initialValues: FormikValues & T;
  onSubmit: (values: FormikValues & T, actions: FormikHelpers<FormikValues & T>) => void;
  validationSchema: any;
  render: (formikProps: FormikProps<FormikValues & T>) => React.ReactNode;
  onClose: () => void;
}

function FormDialog<T>({
  open,
  title,
  initialValues,
  onSubmit,
  validationSchema,
  render,
  onClose,
}: FormDialogProps<T>) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => render(formikProps)}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
