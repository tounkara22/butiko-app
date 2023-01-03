import { SvgIconProps } from "@mui/material";
import { StyledActionButton } from "./buttons.styles";

interface IActionButton {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  leadingIcon?: JSX.Element;
}

export default function ActionButton({
  children,
  onClick,
  leadingIcon,
}: IActionButton) {
  if (!children) {
    return <></>;
  }

  return (
    <StyledActionButton onClick={(e) => onClick(e)}>
      <div>
        {leadingIcon && <span>{leadingIcon}</span>}
        <h2>{children}</h2>
      </div>
    </StyledActionButton>
  );
}
