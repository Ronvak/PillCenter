import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import MyButton from "../buttons/ButtonTemplate";
import * as React from "react";
import EndVideoMessage from "./EndVideoMessage";
export default function EndSession(props) {
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MyButton
        sx={{ marginTop: 3 }}
        fullWidth
        onClick={() => handleClickOpen()}
      >
        סיים מפגש
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          סיום מפגש עם מטופל
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה מאשר למטופל זה לקיחת תרופה?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton
            fullWidth
            sx={{ marginRight: "auto" }}
            onClick={() => {
              handleClose();
            }}
          >
            כן
          </MyButton>

          <MyButton fullWidth onClick={() => setOpen(false)}>
            לא
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
