import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MedicineChoose from "../orderFlow/MedicineChoose";
import MachinesList from "../orderFlow/MachinesList";
import PaymentNConfirm from "../orderFlow/PaymentNConfirm";
import Questionnaire from "../questionnaire/Questionnaire";
import CancelOrder from "../orderFlow/CancelOrder";

const steps = ["בחירת מרשם", "מיקום איסוף", "שאלון", "תשלום ואישור"];

export default function ProcessBar() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [medicineChoise, setMedicineChoise] = useState();
  const [machineChoice, setMachineChoise] = useState({});
  const [questionnaire, setQuestionnaire] = useState({});

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleMedicineChoose = (input) => {
    if (isNaN(input) === false) {
      setMedicineChoise(input);
    }
    handleNext();
  };
  const handleQuestionnaire = (input) => {
    setQuestionnaire(input);
    handleNext();
  };
  const handleMachineChoose = (machine) => {
    setMachineChoise(machine);
    handleNext();
  };
  const handleNext = (input) => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (step) => {
    if (step < activeStep && activeStep !== steps.length - 1)
      setActiveStep(step);
  };

  const componentsList = [
    <MedicineChoose handleMedicineChoose={handleMedicineChoose} />,
    <MachinesList
      medicineChoise={medicineChoise}
      handleMachineChoose={handleMachineChoose}
    />,
    <Questionnaire
      questionnaire={questionnaire}
      handleQuestionnaire={handleQuestionnaire}
    />,

    <PaymentNConfirm
      machineChoice={machineChoice}
      medicineChoise={medicineChoise}
    />,
  ];
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stepper
        sx={{
          width: "370px",
        }}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#646464 ", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "black", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#646464", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "white", // circle's number (ACTIVE)
                },
                maxWidth: "90%",
              }}
              key={label}
              {...stepProps}
            >
              <StepLabel onClick={() => handleBack(index)} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {componentsList[activeStep]}
    </Box>
  );
}
