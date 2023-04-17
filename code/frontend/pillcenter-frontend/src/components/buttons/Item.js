import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 25,
  verticalAlign: "middle",
  lineHeight: "150px",
  borderColor: "#00000",
  borderWidth: "50px",
  height: "150px",
  fontSize: 17,

  "&:hover": {
    backgroundColor: "#C0C0C0",
  },
}));

export default Item;
