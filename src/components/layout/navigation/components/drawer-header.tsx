import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import SizedPaper from "../../../../views/containers/sized-paper";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import MenuDropdown from "../../../../views/dropdown/menu-dropdown";
import { signOut } from "next-auth/react";
import { AddBusiness } from "@mui/icons-material";
import useCopy from "../../../../hooks/useCopy";
import { useReactiveVar } from "@apollo/client";
import { UserVar } from "../../../../apollo-client/globalVars";

export default function DrawerHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { copy } = useCopy();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <SizedPaper width="100%" height="200px" elevation={0} padding="10px">
        <Card sx={{ border: "solid 1px lightgray" }}>
          <CardActionArea onClick={handleOpen}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src="https://yt3.ggpht.com/ytc/AMLnZu95DPRFRG3ruAfZPsyRza7cV3jdq7qetKz3Emb-XQ=s900-c-k-c0x00ffffff-no-rj" />
                <Typography>Fanci Services</Typography>
                <KeyboardArrowDown />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </SizedPaper>
      <MenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <MenuItem>
          <Avatar>1</Avatar> {copy["appDrawer.profile.personal"]}
        </MenuItem>
        <Divider />
        <MenuItem>
          <AddBusiness sx={{ marginRight: "2px" }} fontSize="large" />
          {copy["appDrawer.profile.addBusiness"]}
        </MenuItem>
        <Divider />
        <MenuItem> {copy["appDrawer.profile.profile"]}</MenuItem>
        <MenuItem> {copy["appDrawer.profile.settings"]}</MenuItem>
        <MenuItem onClick={handleSignout}>
          {copy["appDrawer.profile.logout"]}
        </MenuItem>
      </MenuDropdown>
    </>
  );
}
