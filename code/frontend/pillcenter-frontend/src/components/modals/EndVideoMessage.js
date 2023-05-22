import * as React from "react";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import { blue } from "@mui/material/colors";

const messageAccept = "הרוקח אישר את לקיחת התרופה בעבורך. אתה מועבר לשלב הבא.";
const messageDeny =
  "הרוקח לא אישר את לקיחת התרופה. לצערנו, לא תוכל להמשיך בתהליך";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, isApproved } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen
      PaperProps={{
        sx: {
          position: "relative",
          bottom: 160,

          width: "100%",
          height: 200,
        },
      }}
    >
      <DialogTitle>שיחת הוידיאו הסתיימה</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <VaccinesIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={isApproved ? messageAccept : messageDeny} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const { openDialog, isApproved, setOpenDialog } = props;
  const [selectedValue, setSelectedValue] = React.useState(messageAccept[1]);

  const handleClose = (value) => {
    setOpenDialog(true);
    setSelectedValue(value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClose(selectedValue);
    }, 500000);

    return () => {
      clearTimeout(timer); // Clear the timer if the component is unmounted before the timeout
    };
  }, [selectedValue]);

  return (
    <div>
      <SimpleDialog
        isApproved={isApproved}
        selectedValue={selectedValue}
        open={openDialog}
        onClose={handleClose}
      />
    </div>
  );
}
