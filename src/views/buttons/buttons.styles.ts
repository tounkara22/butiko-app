import styled from "@emotion/styled";

export const StyledActionButton = styled("button")({
  height: "50px",
  minWidth: "100px",
  borderRadius: "8px",
  borderColor: "transparent",
  padding: "5px 20px",
  "& div": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",

    "& h2": {
      padding: "0",
      margin: "0",
      fontSize: "16px",
    },
  },
  "&:hover": {
    backgroundColor: "lightgray",
    cursor: "pointer",
  },
});
