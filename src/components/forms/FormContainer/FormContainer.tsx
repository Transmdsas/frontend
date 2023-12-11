import React from "react";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";

interface FormProps<T> {
  initialValues: FormikValues & T;
  onSubmit: (
    values: FormikValues & T,
    actions: FormikHelpers<FormikValues & T>
  ) => void;
  validationSchema: any;
  render: (formikProps: FormikProps<FormikValues & T>) => React.ReactNode;
}

function FormContainer<T>({
  initialValues,
  onSubmit,
  validationSchema,
  render,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {(formikProps) => render(formikProps)}
    </Formik>
  );
}

export default FormContainer;
