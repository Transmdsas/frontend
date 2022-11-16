// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentVehicleSetUp } from "../actions/Actions";
// import { useNavigate } from "react-router-dom";

// export const useSteps = (step: number, form: any[]) => {
//   const steps = useSelector((store: any) => store.SteperReducer);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const setNextStep = steps.find((data: any) => data.id === step + 1).link;
//   const [openPopUp, setOpenPopUp] = React.useState(true);

//   const handleClose = () => {
//     setOpenPopUp(false);
//     navigate(`/vehiculos${setNextStep}`);
//     if (step === 1) {
//       sessionStorage.setItem("carPlate", form[0].value);
//     }
//     dispatch(setCurrentVehicleSetUp(form));
//   };

//   const handleCloseByError = () => {
//     setOpenPopUp(false);
//     navigate(`/vehiculos${setNextStep}`);
//   };

//   return {
//     handleClose,
//     handleCloseByError,
//     openPopUp,
//     steps,
//   };
// };

import React from 'react'

const useSteps = () => {
  return (
    <div>useSteps</div>
  )
}

export default useSteps