import React, { useState, useEffect, useContext } from "react";

import ProcessBar from "../components/processBar/ProcessBar";

const MakeOrderPage = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <ProcessBar />
<<<<<<< code/frontend/pillcenter-frontend/src/pages/MakeOrderPage.js
      <center>
        <br></br>

        <br></br>

        <Typography variant="h5"> אנא בחר מרשם אותו </Typography>
        <Typography variant="h5"> אתה רוצה לאסוף </Typography>
        <br></br>
        <Box sx={{ width: "70%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 2 }}
          >
            {medicines.map((medicine) => {
              return (
                <Grid xs={12} key={medicine.id}>
                  <Item
                    sx={{
                      border: 1,
                      borderWidth: 3,
                      borderColor: "black",
                      height: 75,
                      lineHeight: "75px",
                    }}
                  >
                    {medicine.description}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </center>
=======
>>>>>>> code/frontend/pillcenter-frontend/src/pages/MakeOrderPage.js
    </div>
  );
};

export default MakeOrderPage;
