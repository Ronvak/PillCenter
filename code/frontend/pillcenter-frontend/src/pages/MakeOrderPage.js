import React from "react";
import { Box } from "@mui/system";
import ProcessBar from "../components/processBar/ProcessBar";

const MakeOrderPage = (props) => {
  let { prescriptioned } = props;
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <ProcessBar prescriptioned={prescriptioned} />
      </Box>
    </div>
  );
};

export default MakeOrderPage;
