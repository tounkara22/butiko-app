import MainDrawer from "./drawers/main-drawer/main-drawer";
import { BoxWithFlex, MainBox } from "./layout.styles";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <BoxWithFlex>
      <BoxWithFlex>
        <MainDrawer />
      </BoxWithFlex>
      <MainBox component="main">{children}</MainBox>
    </BoxWithFlex>
  );
}

export default Layout;
