import { Paper, PaperProps } from "@mui/material";

interface ISizedPaperProps extends PaperProps {
  width?: string;
  height?: string;
  children?: JSX.Element | JSX.Element[];
  padding?: string;
}
export default function SizedPaper({
  width,
  height,
  padding,
  children,
}: ISizedPaperProps) {
  return (
    <Paper
      sx={{
        width,
        height,
        borderRadius: "12px",
        padding,
      }}
    >
      {children}
    </Paper>
  );
}
