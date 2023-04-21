import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyButton from "../buttons/ButtonTemplate";
import Icon from "@mdi/react";
import IconButton from "@mui/material/IconButton";
import { mdiWaze } from "@mdi/js";
import { SiGooglemaps } from "react-icons/si";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

const wazelink = "https://waze.com/ul?q=";
const googlemapLink = "https://www.google.com/maps/dir/?api=1&destination=";

export default function Navigation(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const { machineChoice } = props;
  const handleOpen = () => {
    setOpen(true);
  };
  var number = machineChoice.address.replace(/^\D+/g, "");
  var address = machineChoice.address.replace(/[0-9]/g, "");
  address = address.replace(/ /g, "%20");
  var city = machineChoice.city.replace(/ /g, "%20");

  return (
    <div>
      <MyButton fullWidth onClick={handleOpen}>
        נווט
      </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            המוצר שלך מחכה בכתובת {machineChoice.address} , {machineChoice.city}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            באפשרותך לבחור באחד מדרכי הניווט הבאים אל המכונה.
            <br></br>
            <a
              href={`${wazelink}${number}%20${city}%20${address}&navigate=yes`}
              target="_blank"
            >
              <IconButton
                sx={{
                  textDecorationColor: "black",
                  textEmphasisColor: "black",
                }}
              >
                <Icon path={mdiWaze} size={1.6} color="#42D4FF" />
                Waze
              </IconButton>
            </a>
            <a
              href={`${googlemapLink}${address}%20${number}%2C${city}`}
              target="_blank"
            >
              <IconButton aria-label="Google">
                <SiGooglemaps color="#F4B400" size={32} />
                GoogleMaps
              </IconButton>
            </a>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
