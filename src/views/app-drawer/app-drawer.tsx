import { DrawerProps } from "@mui/material";
import { StyledDrawer } from "./app-drawer.styles";

interface IDrawerProps extends DrawerProps {
  children: JSX.Element | JSX.Element[];
}

export default function AppDrawer({ children, ...props }: IDrawerProps) {
  return <StyledDrawer {...props}>{children}</StyledDrawer>;
}
