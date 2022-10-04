import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function StepperHorizontal({ steps, handleClickSteeper }: any) {
  const selectedStep = steps.find((data: any) => data.selected === true).id;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        activeStep={selectedStep - 1}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            width: "2em",
            height: "2em",
          },
          "& .MuiStepConnector-root": {
            top: "24px",
            left: "calc(-50% + 35px); right: calc(50% + 35px)",
          },
        }}
      >
        {steps.map((label: any, index: any) => (
          <Step
            key={label.step}
            completed={label.completed}
            disabled={label.disabled}
          >
            <StepButton
              color="inherit"
              onClick={(e) => handleClickSteeper(e, label.id)}
            >
              {label.step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
