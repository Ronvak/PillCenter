import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import MedicineChoose from "../orderFlow/MedicineChoose";
import MachinesList from "../orderFlow/MachinesList";
import PaymentNConfirm from "../orderFlow/PaymentNConfirm";
import Questionnaire from "../questionnaire/Questionnaire";
import VideoCallMessage from "../modals/VideoCallMessage";
import CancelOrder from "../orderFlow/CancelOrder";
import WaitingRoom from "../pharamacist/WaitingRoom";

export default function ProcessBar(props) {
  const [steps, setSteps] = useState([
    "בחירת מרשם",
    "מיקום איסוף",
    "שאלון",
    "תשלום ואישור",
  ]);
  const { prescriptioned } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [medicineChoise, setMedicineChoise] = useState();
  const [machineChoice, setMachineChoise] = useState({});
  const [questionnaire, setQuestionnaire] = useState({});
  const [oneTime, setOneTime] = useState(0);
  const [openVideoCallMessage, setOpenVideoCallMessage] = useState(false);

  useEffect(() => {
    if (prescriptioned === "True" && oneTime === 0) {
      let newSteps = [...steps];
      newSteps.splice(1, 0, "שיחת רוקח");
      setSteps(newSteps);
      let newComponentList = [...componentsList];
      newComponentList.splice(1, 0, <WaitingRoom />);
      setComponentList(newComponentList);
      setOneTime(1);
    }
  }, [prescriptioned]);

  function handleClose() {
    setOpenVideoCallMessage(false);
  }

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
  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (step) => {
    if (step < activeStep && activeStep !== steps.length - 1)
      setActiveStep(step);
  };
  const [componentsList, setComponentList] = useState([
    <MedicineChoose
      handleMedicineChoose={handleMedicineChoose}
      prescriptioned={prescriptioned}
      setOpenVideoCallMessage={setOpenVideoCallMessage}
    />,
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
  ]);
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stepper
        sx={{
          width: "100%",

          alignItems: "flex-start",
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
                width: "100%",
                "& .MuiStepLabel-root": {
                  "& .MuiStepLabel-label": {
                    fontSize: "0.8rem",
                  },
                },
                "& .MuiStepLabel-active": {
                  fontWeight: "bold",
                },
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
      <VideoCallMessage
        open={openVideoCallMessage}
        handleClose={handleClose}
        handleNext={handleNext}
      />
    </Box>
  );
}
