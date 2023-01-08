import styled from "@emotion/styled";
import { Drawer } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  width: "300px",
  height: "100%",
  "& .MuiDrawer-paper": {
    width: "300px",
    boxSizing: "border-box",
    padding: "20px",
  },
});
