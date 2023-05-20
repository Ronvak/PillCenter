import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MyButton from "../buttons/ButtonTemplate";
import Draggable from "react-draggable";
import * as React from "react";

import { Paper } from "@mui/material";

export default function VideoCallMessage({ open, handleClose, handleNext }) {
  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          כדי לספק תרופות מרשם עליך לבצע התייעצות שיחת וידיאו עם רוקח
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם תרצה לבצע שיחה מקוונת עם רוקח?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton
            fullWidth
            sx={{ marginRight: "auto" }}
            autoFocus
            onClick={() => {
              handleNext();
              handleClose();
            }}
          >
            כן
          </MyButton>
          <MyButton fullWidth autoFocus onClick={handleClose}>
            לא
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
