import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

interface IHideShow {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  position?: "start" | "end";
}

export default function HideAndShowButton({ isVisible, setIsVisible, position = "end" }: IHideShow) {
  return (
    <InputAdornment position={position}>
      <IconButton onClick={() => setIsVisible(!isVisible)}>{isVisible ? <Visibility /> : <VisibilityOff />}</IconButton>
    </InputAdornment>
  );
}
