import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { useSelector } from "react-redux";

export default function StepperHorizontal() {
  const steps = useSelector((store: any) => store.SteperReducer);
  console.log({ steps });

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  // React.useEffect(() => {
  //   const stepsIcons = document.querySelectorAll(".MuiStepIcon-root");
  //   Object.values(stepsIcons).map((data) =>
  //     data.setAttribute("style", "width:2em; height: 2em;")
  //   );
  //   const steptsConectors = document.querySelectorAll(".MuiStepConnector-root");
  //   Object.values(steptsConectors).map((data) =>
  //     data.setAttribute(
  //       "style",
  //       "top:24px; left: calc(-50% + 35px); right: calc(50% + 35px);"
  //     )
  //   );
  // }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step: any, i: any) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        sx={{ "&.MuiStep-root": { width: "2em", height: "2em" } }}
      >
        {steps.map((label: any, index: any) => (
          <Step
            key={label.step}
            completed={label.completed}
            disabled={label.disabled}
          >
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label.step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
