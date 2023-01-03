import { Button } from "@mui/material";
import { StyledButton } from "./primary-button.styles";

interface IPrimaryButton {
  title: string;
  color?: "primary" | "secondary" | "danger" | "transparent";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function PrimaryButton({
  title,
  onClick,
  color,
}: IPrimaryButton) {
  let bgColor = "#F9F6F6";

  switch (color) {
    case "primary":
    case "secondary":
    case "danger":
    case "transparent":
    default:
      bgColor = "#F9F6F6";
  }

  return (
    <>
      <StyledButton onClick={onClick} variant="contained">
        {title}
      </StyledButton>
    </>
  );
}
