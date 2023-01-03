import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";


export const SummaryPaperContainer = styled("div")({
  margin: "50px 0",
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 1100px)": {
    width: "100%",
  },
});
export const StyledSummaryPaper = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 10px",
  minWidth: "100%",
  backgroundColor: "whitesmoke",
  borderRadius: "15px",
});
