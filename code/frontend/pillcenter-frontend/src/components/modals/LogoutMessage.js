import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import MyButton from "../buttons/ButtonTemplate";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation } from "react-router-dom";
const MyIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: "#646464",
  },
}));

export default function LogoutMessage(props) {
  const { handleBack } = props;

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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const location = useLocation();

  return (
    <>
      <MyIconButton
        size="large"
        color="inherit"
        sx={{ mr: -2 }}
        onClick={() => {
          if (location.pathname !== "/") handleBack();
          else handleClickOpen();
        }}
      >
        {" "}
        <KeyboardBackspaceIcon />
      </MyIconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          יציאה מהמערכת
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שאתה רוצה לצאת ממערכת PillCenter?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton
            fullWidth
            sx={{ marginRight: "auto" }}
            autoFocus
            onClick={() => {
              handleClose();
              handleBack();
            }}
          >
            כן אני בטוח
          </MyButton>
          <MyButton fullWidth autoFocus onClick={() => setOpen(false)}>
            לא
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
