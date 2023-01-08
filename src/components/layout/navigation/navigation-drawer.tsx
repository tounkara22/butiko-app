import { Divider } from "@mui/material";
import AppDrawer from "../../../views/app-drawer/app-drawer";
import DrawerHeader from "./components/drawer-header";
import { MAIN_DRAWER_ITEMS } from "./components/main-drawer-helper";
import { MainDrawerItems } from "./components/main-drawer-items";

export default function NavigationDrawer() {
  return (
    <AppDrawer anchor="left" variant="permanent">
      <DrawerHeader />
      <Divider />
      <MainDrawerItems drawerList={MAIN_DRAWER_ITEMS} />
    </AppDrawer>
  );
}
