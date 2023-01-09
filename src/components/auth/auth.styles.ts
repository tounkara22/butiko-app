import styled from "@emotion/styled";
import { Stack, TextField } from "@mui/material";

export const StyledHeaderContainer = styled("div")({
  height: "20vh",
  minHeight: "200px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px 100px",
  backgroundColor: "#F9F6F6",
});

export const StyledToolbar = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledStack = styled(Stack)({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

export const StyledFormContainer = styled.form({
  maxWidth: "600px",
  minWidth: "400px",
  margin: "100px 0",
  display: "flex",
  gap: "18px",
  flexDirection: "column",
  justifyContent: "center",
});

export const StyledLogoDiv = styled.div({
  "&:hover": {
    cursor: "pointer",
  },
});

export const StyledTextfield = styled(TextField)({
  ".MuiFormHelperText-root": {
    marginLeft: "0",
  },
});

export const CenteredDiv = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});