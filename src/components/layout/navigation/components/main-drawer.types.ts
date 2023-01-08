export interface DrawerItem {
  id: string;
  customIcon: JSX.Element;
  title: string;
  route: string;
  isSelected?: boolean;
}

export interface MenuSelectItems {
  id: string;
  title: string;
  isSelected?: boolean;
}

export interface MenuItemProps {
  id: string;
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
}
