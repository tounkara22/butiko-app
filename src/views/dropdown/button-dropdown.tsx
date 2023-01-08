import { Button, MenuItem, Avatar, ListItemIcon, Divider } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  MenuSelectItems,
  MenuItemProps,
} from "../../components/layout/navigation/components/main-drawer.types";
import MenuDropdown from "./menu-dropdown";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface IButtonDropdown {
  menuItems: MenuItemProps[];
  selectItems?: MenuSelectItems[];
  title?: string;
}

export default function ButtonDropdown({
  menuItems,
  selectItems,
  title,
}: IButtonDropdown) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  let businessName = "";
  const MenuItemsComponent: JSX.Element[] = [];

  const handleMenuActionClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuId: string
  ) => {
    if (menuId === "user_logout") {
      const logoff = await signOut({ callbackUrl: "/login" });
      console.log(logoff);
    }
  };

  selectItems?.map((selectItem) => {
    if (selectItem.isSelected) {
      businessName = selectItem.title;
    }
    MenuItemsComponent.push(
      <MenuItem key={selectItem.id} selected={selectItem.isSelected}>
        <Avatar sizes="10px">{selectItem.title[0]}</Avatar> {selectItem.title}
      </MenuItem>
    );
  });

  if (selectItems != null) {
    MenuItemsComponent.push(<Divider />);
  }

  menuItems.map((menuItem) => {
    MenuItemsComponent.push(
      <MenuItem
        key={menuItem.id}
        onClick={(e) => handleMenuActionClick(e, menuItem.id)}
      >
        <ListItemIcon>{menuItem.icon}</ListItemIcon>
        {menuItem.title}
      </MenuItem>
    );
  });

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{ justifyContent: "space-between" }}
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleOpen}
      >
        {title || businessName}
      </Button>
      <MenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        {MenuItemsComponent}
      </MenuDropdown>
    </>
  );
}
