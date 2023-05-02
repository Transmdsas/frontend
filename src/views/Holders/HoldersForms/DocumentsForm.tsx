import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GridColTypeDef } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import {
  CalendarField,
  DropdownField,
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

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};
interface DocumentsFormProps {
  loadType: string;
  referenceCode?: number;
  handleSubmit?: () => void;
}
const columns = [
  {
    field: "documentType",
    headerName: "Tipo de Documento",
    flex: 0.5,
    ...commonProps,
  },
  {
    field: "documentName",
    headerName: "Nombre del Archivo",
    flex: 0.5,
    ...commonProps,
  },
  {
    field: "fileType",
    headerName: "Tipo de Archivo",
    flex: 0.3,
    ...commonProps,
  },
  {
    field: "dueDate",
    headerName: "Fecha de creación",
    flex: 0.7,
    type: "date",
    valueGetter: ({ value }: any) => dateFormatter.format(new Date(value)),
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
}: DocumentsFormProps) => {
  const parameter = useSelector((state: RootState) =>
    selectParamById(state, DOC_CONFIG_PARAM_ID)
  );
  const docsConfig = useSelector(selectAllDocsConfig);
  const dispatch = useDispatch<AppDispatch>();
  const [tipoConfig, setTipoConfig] = useState<number>(0);
  const docConfig: any = useSelector((state: RootState) =>
    selectDocConfigByTypeAndRefCode(state, tipoConfig, referenceCode)
  );
  const docsList = useSelector(selectAllDocsList);

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

  const handleDocTypeChange = (value:any) => {
    console.log(value);
    console.log(docsList);
    
  }

  return (
    <React.Fragment>
      {docsList.length <= 0 ? (
        <Loading />
      ) : (
        <>
          <DropdownField
            name="documenType"
            label="Tipo de documento"
            data={docsList}
            keyItem={"documentName"}
            valueItem={"id"}
            md={4}
            lg={3}
            onchange={handleDocTypeChange}
          />
          <InputField
            label="Comentario"
            name="comment"
            type={"text"}
            md={4}
            lg={3}
          />
          <CalendarField
            label="Fecha de vencimiento"
            name="dueDate"
            minDate={new Date()}
          />
          <UploadButton
            label={"Cargar Documento"}
            name={"document"}
            md={4}
            lg={3}
          />
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
            <Button
              onClick={() => console.log("guardar documento")}
              variant="contained"
              color="primary"
            >
              Guardar Documento
            </Button>
          </Grid>

          <Grid item xs={12} alignContent={"rigth"} mt={4}>
            <Datagrid
              rows={[]}
              cols={columns}
              rowId="documentName"
              buttonTitle=""
            />
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};
