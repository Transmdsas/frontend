import React from "react";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { PrimaryButton } from "./PrimaryButton";
// import { useSelector } from "react-redux";

interface CustomToolbarProps {
  buttonTitle: string;
  buttonUrl: string;
}

const CustomToolbar = (props: CustomToolbarProps) => {
  // const buttonProps = useSelector(
  //   (state: any) => state.uiReducers.buttonProps
  // );

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between", padding: 2 }}>
      <GridToolbarFilterButton />
      {props.buttonTitle !== "" ? <PrimaryButton title={props.buttonTitle} url={props.buttonUrl} /> : ""}
    </GridToolbarContainer>
  );
};

export { CustomToolbar };
