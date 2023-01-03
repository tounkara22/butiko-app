import { CircularProgress } from "@mui/material";
import { StyledBox } from "./loading.styles";

interface ILoading {
  size?: "lg" | "md" | "sm";
}

export default function Loading({ size = "lg" }: ILoading) {
  // by default, loading has size lg
  let LoadingComponent = (
    <CircularProgress size={100} sx={{ alignItems: "center" }} />
  );

  return <StyledBox>{LoadingComponent}</StyledBox>;
}
