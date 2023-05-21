import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import MyButton from "../buttons/ButtonTemplate";
import axios from "axios";

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

export default function CancelOrder(props) {
  const [open, setOpen] = React.useState(false);
  const { orderid, handleCancelation } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);

    // Send a POST request to the server
    axios
      .post("/api/cancelorder/", { order_id: orderid })
      .then((response) => {
        handleCancelation();
      })
      .catch((error) => {
        // Handle the error if needed
        console.error("Error cancelling order:", error);
      });
  };

  return (
    <div>
      <MyButton
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ width: "51%", marginBottom: 3 }}
        orderid={orderid}
      >
        ביטול הזמנה
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          ביטול הזמנה
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            האם אתה בטוח שאתה רוצה לבטל הזמנה זו?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton fullWidth onClick={handleCancel}>
            כן אני בטוח
          </MyButton>
          <MyButton fullWidth onClick={handleClose}>
            לא
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
