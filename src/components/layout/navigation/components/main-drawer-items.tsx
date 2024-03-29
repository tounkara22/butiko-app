import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { StyledListItem } from "./main-drawer.styles";
import { DrawerItem } from "./main-drawer.types";

interface IDrawerList {
  drawerList: DrawerItem[];
}

export const MainDrawerItems = ({ drawerList }: IDrawerList) => {
  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];
  return (
    <List>
      {drawerList?.map(({ title, customIcon, id, route }) => {
        if (route === `/${currentPage}`) {
        }
        return (
          <StyledListItem
            isSelected={route === `/${currentPage}`}
            key={id}
            disablePadding
          >
            <ListItemButton onClick={() => router.push(route)}>
              <Stack direction={"row"} spacing="20px">
                {customIcon}
                <Typography>{title}</Typography>
              </Stack>
            </ListItemButton>
          </StyledListItem>
        );
      })}
    </List>
  );
};
