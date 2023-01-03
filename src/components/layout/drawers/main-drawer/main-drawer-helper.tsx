import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import {
  DrawerItem,
  MenuItemProps,
  MenuSelectItems,
} from "./main-drawer.types";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

export const BUTTON_DROPDOWN_ITEMS: MenuItemProps[] = [
  {
    id: "add_new_business",
    title: "Add new business",
    icon: <PersonAdd />,
  },
  {
    id: "user_settings",
    title: "Settings",
    icon: <Settings />,
  },
  {
    id: "user_logout",
    title: "Logout",
    icon: <Logout />,
  },
];

export const BUTTON_DROPDOWN_SELECT_ITEM: MenuSelectItems[] = [
  {
    id: "FANCI_BUSINESS",
    title: "FanCi Services",
    isSelected: true,
  },
  {
    id: "SECOND_FANCY",
    title: "BigTogo Services",
    isSelected: false,
  },
];

export const MAIN_DRAWER_ITEMS: DrawerItem[] = [
  {
    id: "Dashboard-id",
    customIcon: <DashboardIcon />,
    title: "Dashboard",
    route: "/",
  },
  // {
  //   id: "Projects-id",
  //   customIcon: <AccountTreeIcon />,
  //   title: "Projects",
  //   route: "/projects",
  // },
  {
    id: "Clients-id",
    customIcon: <FolderSharedIcon />,
    title: "Clients",
    route: "/clients",
  },
  // {
  //   id: "Transactions-id",
  //   customIcon: <ReceiptLongIcon />,
  //   title: "Transactions",
  //   route: "/transactions",
  // },
  // {
  //   id: "Analytics-id",
  //   customIcon: <AnalyticsIcon />,
  //   title: "Analytics",
  //   route: "/analytics",
  // },
];
