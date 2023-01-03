import { Paper } from "@mui/material";
import { Box } from "@mui/system";

interface IInfoPaper {
  variant?: "info" | "success" | "error";
  width?: string;
  children: JSX.Element | JSX.Element[];
  fullHeight?: boolean;
}
export default function InfoPaper({
  children,
  width = "400px",
  variant,
  fullHeight = false,
}: IInfoPaper) {
  const PaperComponent = (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        width: width,
        minHeight: "100px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {children}
    </Paper>
  );

  if (!fullHeight) {
    return PaperComponent;
  }

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {PaperComponent}
    </Box>
  );
}
