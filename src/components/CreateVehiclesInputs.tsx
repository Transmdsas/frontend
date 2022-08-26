import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { MenuItem, TextField } from "@mui/material";
import { InputsControllers } from "../utils/inputsControllers";

export const CreateVehiclesInputs = () => {
  //   const [selectMarca, setSelectMarca] = React.useState("");
  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //   };
  //   const handleChange = () => {};
  //   const handleChangeMarca = () => {};
  //   const inputs = InputsControllers().createVehicles;
  //   console.log(inputs);
  //   return (
  //     <Grid container spacing={3}>
  //       {/* placa field */}
  //       <Grid item xs={12} md={3}>
  //         <Box
  //           component="form"
  //           noValidate
  //           autoComplete="off"
  //           onSubmit={handleSubmit}
  //         >
  //           <TextField
  //             label={inputs.placa.label}
  //             size={"medium"}
  //             required={true}
  //             name={inputs.placa.name}
  //             fullWidth={true}
  //             onChange={handleChange}
  //           />
  //         </Box>
  //       </Grid>
  //       {/* marca field */}
  //       <Grid item xs={12} md={3}>
  //         <Box
  //           component="form"
  //           autoComplete="off"
  //           onSubmit={(e: any) => handleSubmit(e)}
  //         >
  //           <TextField
  //             label={inputs.marca.label}
  //             select
  //             size={"medium"}
  //             name={inputs.marca.name}
  //             value={selectMarca}
  //             fullWidth={true}
  //             onChange={handleChange}
  //           >
  //             {inputs.marca.dropdownValues?.map((option) => (
  //               <MenuItem key={option.label} value={option.value}>
  //                 {option.label}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         </Box>
  //       </Grid>
  //     </Grid>
  //   );
};
