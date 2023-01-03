import styled from "@emotion/styled";
import { Box, Card, Paper, Typography } from "@mui/material";

export const StyledCard = styled(Card)({
  borderRadius: "12px",
  border: "solid 0.5px lightgrey",
  width: "100%",
  height: "100%",

  button: {
    "MuiCardHeader-root": {
      display: "flex",
      justifyContent: "flex-start",
      // height: "100%",
    },
  },
});

export const BoxWithFlex = styled(Box)({
  display: "flex",
});

export const MainBox = styled(Box)({
  flexGrow: 1,
  padding: "20px 60px",
});

export const StyledPaper = styled(Paper)({
  padding: "10px",
  margin: "0 10px",
  borderRadius: "12px",
  minHeight: "70px",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  border: "dashed 0.5px lightgrey",
  backgroundColor: "#BF000005",
});

export const StyledBalanceText = styled(Typography)({
  fontSize: "9px",
  marginBottom: "0",
});

export const StyledCardHeaderSubtitle = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

export const StyledCardHeaderTitle = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontWeight: "bold",
  fontSize: "20px",
});
