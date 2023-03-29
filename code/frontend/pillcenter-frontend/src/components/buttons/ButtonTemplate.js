import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)(({ theme }) => ({
  borderRadius: "56px",
  display: "flex",
  flexDirection: "row",
  columnGap: "0.8rem",

  color: theme.palette.getContrastText("#646464"),
  borderColor: "#646464",
  backgroundColor: "#646464",
  "&:hover": {
    backgroundColor: "#646464",
  },
}));
export default MyButton;
