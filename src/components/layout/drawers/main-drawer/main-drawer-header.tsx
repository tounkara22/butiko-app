import { Toolbar } from "@mui/material";
import ButtonDropdown from "../../../../views/dropdown/button-dropdown";
import {
  BUTTON_DROPDOWN_ITEMS,
  BUTTON_DROPDOWN_SELECT_ITEM,
} from "./main-drawer-helper";

export default function MainDrawerHeader() {
  return (
    <>
      <Toolbar sx={{ height: "100px" }}>
        <ButtonDropdown
          menuItems={BUTTON_DROPDOWN_ITEMS}
          selectItems={BUTTON_DROPDOWN_SELECT_ITEM}
        />
      </Toolbar>
    </>
  );
}
