import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { CustomToolbar } from "./CustomToolbar";

export const Datagrid = (props: any) => {
  // const [pageSize, setPageSize] = useState(10);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        disableColumnMenu={true}
        rows={props.rows}
        columns={props.cols}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            buttonTitle: props.buttonTitle,
            buttonUrl: props.buttonUrl,
            handleClick: props.handleClick,
            external: props.external,
            disabledButton: props.disabledButton,
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          m: 0,
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1.2,
            fontWeight: "bold",
            color: "primary",
            textAlign: "center",
            fontSize: "1.3em",
          },
          "& .MuiDataGrid-actionsCell": {
            gridGap: 0,
            "& .MuiButtonBase-root": {
              width: "2em",
            },
          },
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[100],
          },
        }}
        columnHeaderHeight={70}
        getRowId={(row) => row[props.rowId]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 1,
          bottom: params.isLastVisible ? 0 : 1,
        })}
      />
    </Box>
  );
};
