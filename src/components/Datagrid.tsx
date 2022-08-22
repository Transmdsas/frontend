import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

// const CustomToolbar: React.FunctionComponent<{
//     setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
//   }> = ({ setFilterButtonEl }) => (
//     <GridToolbarContainer sx={{
//         justifyContent: "end"
//     }}>
//       <GridToolbarFilterButton ref={setFilterButtonEl} />
//     </GridToolbarContainer>
//   );

export default function Datagrid(props: any) {
  // const [filterButtonEl, setFilterButtonEl] =
  // React.useState<HTMLButtonElement | null>(null);
  const [pageSize, setPageSize] = useState(10);
  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.cols}
        //components={{ Toolbar: CustomToolbar }}
        // componentsProps={{
        //     panel: {
        //       anchorEl: filterButtonEl,
        //     },
        //     toolbar: {
        //       setFilterButtonEl,
        //     },
        //   }}
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
            bgcolor: grey[200],
          },
        }}
        headerHeight={70}
        getRowId={(row) => row[props.rowId]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 3,
          bottom: params.isLastVisible ? 0 : 3,
        })}
      />
    </Box>
  );
}
