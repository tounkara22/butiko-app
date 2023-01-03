import styled from "@emotion/styled";
import { Drawer } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  width: 300,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 300,
    boxSizing: "border-box",
  },
});
