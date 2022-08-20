import React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GridRenderCellParams } from "@mui/x-data-grid";

const ProgressContainer = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
  width: "50px",
  height: 26,
  borderRadius: 20,
}));

const ProgressText = styled("div")(({ theme }) => ({
  position: "absolute",
  lineHeight: "24px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  fontSize: "0.8em",
  fontWeight: "bold"
}));

const CustomBar = styled("div")(({theme}) => ({
    height: "100%"
}));


const getProgressColor = (value: number) =>{
    return (value < 30 ? "#f44336" : value >= 30 && value <= 70 ? "#efbb5aa3" : "#088208a3")
}

interface ProgressBarProps {
  value: number;
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <React.Fragment>
      <CssBaseline />
      <ProgressContainer>
        <ProgressText>{`${valueInPercent.toLocaleString()} %`}</ProgressText>
        <CustomBar
          sx={{
            maxWidth: `${valueInPercent}%`,
            backgroundColor: getProgressColor(valueInPercent) 
          }}
        />
      </ProgressContainer>
    </React.Fragment>
  );
});
export function renderProgress(params: GridRenderCellParams) {
  return <ProgressBar value={Number(params.value)!} />;
}