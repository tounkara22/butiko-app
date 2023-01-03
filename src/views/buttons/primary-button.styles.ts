import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)((props) => ({
  height: "50px",
  width: "100%",
  borderRadius: "8px",
  padding: "5px 20px",
  borderColor: "lightgrey",
  backgroundColor: props.color,
  "&:hover": {
    cursor: "pointer",
  },
}));

// ({
//   height: "50px",
//   maxWidth: "200px",
//   borderRadius: "8px",
//   borderColor: "transparent",
//   padding: "5px 20px",
//   "& div": {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: "10px",
//     justifyContent: "center",

//     "& h2": {
//       padding: "0",
//       margin: "0",
//       fontSize: "16px",
//     },
//   },
//   "&:hover": {
//     backgroundColor: "lightgray",
//     cursor: "pointer",
//   },
// });
