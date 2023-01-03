import { StyledDrawer } from "./drawer.styles";

interface IDrawer {
  children: JSX.Element | JSX.Element[];
}

export default function Drawer({ children }: IDrawer) {
  return (
    <>
      <StyledDrawer variant="permanent" anchor="left">
        {children}
      </StyledDrawer>
    </>
  );
}
