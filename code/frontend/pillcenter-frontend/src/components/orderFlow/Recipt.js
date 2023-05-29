import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Recipt(props) {
  const { medicine } = props;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table
        size="small"
        sx={{ height: "100px", width: "100%" }}
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              שם התרופה
            </TableCell>

            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
                width: "38%  ",
              }}
              align="center"
            >
              חברה
            </TableCell>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              מחיר
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={medicine?.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              component="th"
              scope="row"
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
            >
              {medicine?.medicine_name}
            </TableCell>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              {medicine?.brand}
            </TableCell>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              {medicine?.price}₪
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            ></TableCell>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              {" "}
              סה"כ לתשלום :
            </TableCell>
            <TableCell
              sx={{
                borderRightStyle: "inset",
                borderRightWidth: "1px",
              }}
              align="center"
            >
              {" "}
              {medicine?.price}₪
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
