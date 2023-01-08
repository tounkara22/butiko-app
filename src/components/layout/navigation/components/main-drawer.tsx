import Divider from "@mui/material/Divider";
import { MAIN_DRAWER_ITEMS } from "./main-drawer-helper";
import { MainDrawerItems } from "./main-drawer-items";
import MainDrawerHeader from "./drawer-header";
import AppDrawer from "../../../../views/app-drawer/app-drawer";

export default function MainDrawer() {
  return (
    <AppDrawer anchor="left" variant="permanent">
      <MainDrawerHeader />
      <Divider />
      <MainDrawerItems drawerList={MAIN_DRAWER_ITEMS} />
    </AppDrawer>
  );
}
