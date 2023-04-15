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
  handleClick?: () => void;
  external?: boolean;
  disabledButton?: boolean;
}

const CustomToolbar = (props: CustomToolbarProps) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between", padding: 2 }}>
      <GridToolbarFilterButton />
      {props.buttonTitle !== "" ? <PrimaryButton title={props.buttonTitle} url={props.buttonUrl} handleClick={props.handleClick} external={props.external} disabled={props.disabledButton} /> : ""}
    </GridToolbarContainer>
  );
};

export { CustomToolbar };
