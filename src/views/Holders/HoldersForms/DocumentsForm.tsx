import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GridColTypeDef } from "@mui/x-data-grid";
import { Button, Grid, Stack } from "@mui/material";
import {
  CalendarField,
  DropdownField,
  FormContainer,
  InputField,
  UploadButton,
} from "./../../../components/forms";
import { Datagrid } from "../../../components/Datagrid";
import { dateFormatter } from "../../../utils/utils";
import {
  selectParamById,
  getParametersById,
} from "../../../store/parameters/parameterSlice";
import { AppDispatch, RootState } from "../../../store";
import {
  getDocsConfig,
  selectAllDocsConfig,
  selectDocConfigByTypeAndRefCode,
} from "../../../store/docsConfig/docConfigSlice";
import {
  getDocsList,
  resetDocsListState,
  selectAllDocsList,
} from "../../../store/docsList/docsListSlice";
import Loading from "../../../components/Loading";
import { Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  documentListId: "",
  observation: "",
  documentDueDate: "",
  document: "",
};

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};
interface DocumentsFormProps {
  loadType: string;
  referenceCode?: number;
  handleSubmit?: (values: any) => void;
  onCancel?: () => void;
  gridRows?: any[];
}
const columns = [
  {
    field: "documentListId",
    headerName: "Tipo de Documento",
    flex: 0.3,
    ...commonProps,
  },
  {
    field: "documentName",
    headerName: "Nombre del Archivo",
    flex: 0.4,
    ...commonProps,
  },
  {
    field: "observation",
    headerName: "Comentario",
    flex: 0.5,
    ...commonProps,
  },
  {
    field: "dueDate",
    headerName: "Fecha de creación",
    flex: 0.7,
    type: "date",
    valueGetter: ({ value }: any) => value && dateFormatter.format(new Date(value)),
    ...commonProps,
  },

  {
    field: "comments",
    headerName: "Comentarios",
    flex: 0.4,
    align: "center",
    ...commonProps,
  },
];
const DOC_CONFIG_PARAM_ID = 15;

export const DocumentsForm = ({
  loadType,
  referenceCode,
  handleSubmit,
  onCancel,
  gridRows,
}: DocumentsFormProps) => {
  const [tipoConfig, setTipoConfig] = useState<number>(0);
  const [dueDateRequired, setDueDateRequired] = useState<boolean>(false);
  const parameter = useSelector((state: RootState) =>
    selectParamById(state, DOC_CONFIG_PARAM_ID)
  );
  const docConfig: any = useSelector((state: RootState) =>
    selectDocConfigByTypeAndRefCode(state, tipoConfig, referenceCode)
  );
  const docsList = useSelector(selectAllDocsList);
  const docsConfig = useSelector(selectAllDocsConfig);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (parameter === undefined) {
      dispatch(getParametersById(DOC_CONFIG_PARAM_ID));
    }
    setTipoConfig(
      parameter?.values?.find((p) => p.description === loadType)?.id || 0
    );
    if (docsConfig.length === 0) {
      dispatch(getDocsConfig());
    }
  }, [dispatch, parameter, docsConfig.length, loadType]);

  useEffect(() => {
    dispatch(resetDocsListState());
    if (docConfig !== undefined) {
      dispatch(getDocsList(docConfig?.id));
    }
  }, [dispatch, docConfig]);

  const validationSchema = Yup.object().shape({
    documentListId: Yup.number().required("El tipo de documento es requerido"),
    observation: Yup.string().nullable(),
    documentDueDate: dueDateRequired
      ? Yup.date()
          .required()
          .typeError("Fecha Inválida")
          .required("Debe ingresar la fecha")
      : Yup.date().nullable().typeError("Fecha Inválida"),
    document: Yup.string().required(
      "Debe seleccionar un archivo para poder cargarlo"
    ),
  });

  const handleDocTypeChange = (value: any) => {
    const docConfig = docsList.find((doc) => doc.id === value);
    setDueDateRequired(docConfig?.needDueDate || false);
  };

  const saveDoc = (formValues: any, actions: any) => {
    if (!dueDateRequired) delete formValues.documentDueDate;
    actions.setTouched({});
    actions.setSubmitting(false);
    if (handleSubmit) handleSubmit({ ...formValues });
    actions.resetForm();
  };

  return (
    <React.Fragment>
      {docsList.length <= 0 ? (
        <Loading />
      ) : (
        <>
          <FormContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={saveDoc}
            render={(formikProps) => (
              <Form onSubmit={formikProps.handleSubmit}>
                <Grid
                  container
                  rowSpacing={4}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    p: 2,
                    mt: 3,
                    mb: 3,
                    justifyContent: "initial",
                  }}
                >
                  <DropdownField
                    name="documentListId"
                    label="Tipo de documento"
                    data={docsList.filter((doc) => doc.isActive === true)}
                    keyItem={"documentName"}
                    valueItem={"id"}
                    md={4}
                    lg={3}
                    onchange={handleDocTypeChange}
                  />
                  <InputField
                    label="Comentario"
                    name="observation"
                    type={"text"}
                    md={4}
                    lg={3}
                  />
                  {dueDateRequired && (
                    <CalendarField
                      label="Fecha de vencimiento"
                      name="documentDueDate"
                      minDate={new Date()}
                    />
                  )}
                  <UploadButton
                    label={"Cargar Documento"}
                    name={"document"}
                    md={4}
                    lg={3}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end",
                    paddingRight: 1,
                  }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Guardar Documento
                  </Button>
                </Grid>
              </Form>
            )}
          />

          <Grid item xs={12} alignContent={"rigth"} mt={4}>
            <Datagrid
              rows={gridRows || []}
              cols={columns}
              rowId="id"
              buttonTitle=""
            />
          </Grid>
          <Grid item xs={12} mt={3} alignContent={"rigth"}>
            <Stack direction="row" justifyContent="end">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                sx={{ mr: 4 }}
                onClick={() => onCancel && onCancel()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                Finalizar
              </Button>
            </Stack>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};
