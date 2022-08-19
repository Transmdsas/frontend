import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";

const CustomToolbar: React.FunctionComponent<{
    setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  }> = ({ setFilterButtonEl }) => (
    <GridToolbarContainer sx={{
        justifyContent: "end"
    }}>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );

export default function Datagrid(props: any) {
    const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.cols}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        sx= {{ m: 0 }}
      />
    </Box>
  );
}
