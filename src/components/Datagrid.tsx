import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { CustomToolbar } from "./CustomToolbar";


export const Datagrid = (props: any) => {
  const [pageSize, setPageSize] = useState(10);
  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        disableColumnMenu={true}
        rows={props.rows}
        columns={props.cols}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: { buttonTitle: props.buttonTitle, buttonUrl: props.buttonUrl}
        }}
        rowsPerPageOptions={[10, 25, 50]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[100],
          },
        }}
        headerHeight={70}
        getRowId={(row) => row[props.rowId]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 1,
          bottom: params.isLastVisible ? 0 : 1,
        })}
      />
    </Box>
  );
}
