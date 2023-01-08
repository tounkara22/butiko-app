import { BoxWithFlex, MainBox } from "./layout.styles";
import NavigationDrawer from "./navigation/navigation-drawer";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <BoxWithFlex>
      <BoxWithFlex>
        <NavigationDrawer />
      </BoxWithFlex>
      <MainBox component="main">{children}</MainBox>
    </BoxWithFlex>
  );
}

export default Layout;
