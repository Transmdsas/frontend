import React from 'react'
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

interface StepperProps {
  steps: String[]
}


const StepperComponent = ({ steps }: StepperProps) => {

  return (
    <>
      {/* <Stepper
        activeStep={activeStep}
        nonLinear
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
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
    </>
  )
}

export default StepperComponent