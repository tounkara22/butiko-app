import Divider from "@mui/material/Divider";
import { MAIN_DRAWER_ITEMS } from "./main-drawer-helper";
import { MainDrawerItems } from "./main-drawer-items";
import MainDrawerHeader from "./main-drawer-header";
import Drawer from "../../../../views/drawer/drawer";

export default function MainDrawer() {
  return (
    <Drawer>
      <MainDrawerHeader />
      <Divider />
      <MainDrawerItems drawerList={MAIN_DRAWER_ITEMS} />
    </Drawer>
  );
}
