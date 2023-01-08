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
import React, { useEffect, useState } from "react";
import MenuDropdown from "../../../../views/dropdown/menu-dropdown";
import { signOut } from "next-auth/react";
import { AddBusiness } from "@mui/icons-material";
import useCopy from "../../../../hooks/useCopy";
import { useReactiveVar } from "@apollo/client";
import { UserVar } from "../../../../apollo-client/globalVars";

export default function DrawerHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { copy } = useCopy();
  const { currentProfile, firstName, businesses } = useReactiveVar(UserVar);
  const [displayName, setDisplayName] = useState<string>();

  useEffect(() => {
    // given the current profile, we update the user to use
    // whenever a change occurs, we update localStorage
    // so that upon sign in, we pick up from last updated profile
    if (currentProfile === "PERSONAL") {
      setDisplayName(firstName);
      localStorage.setItem("current-profile", "PERSONAL");
    } else {
      const currentBusiness = businesses.find(
        (business) => business._id === currentProfile
      );
      setDisplayName(currentBusiness?.name);
      localStorage.setItem("current-profile", currentBusiness?._id as string);
    }
  }, [currentProfile]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const handleMenuItemClick = (id: string) => {
    UserVar().currentProfile = id;
  };

  const BusinessesList: JSX.Element[] = businesses?.map((business) => {
    return (
      <MenuItem
        key={business._id}
        selected={currentProfile === business._id?.toString()}
        onClick={() => handleMenuItemClick(business._id)}
      >
        <Avatar>{business.name[0] || ""}</Avatar> {business.name}
      </MenuItem>
    );
  });

  const getBusinessList = () => {
    return (
      <div>
        {businesses?.map((business) => {
          return (
            <MenuItem
              key={business._id}
              selected={currentProfile === business._id?.toString()}
              onClick={() => handleMenuItemClick(business._id)}
            >
              <Avatar>{business.name[0] || ""}</Avatar> {business.name}
            </MenuItem>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <SizedPaper width="100%" height="200px" elevation={0} padding="10px">
        <Card sx={{ border: "solid 1px lightgray" }}>
          <CardActionArea onClick={handleOpen}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Avatar src="https://yt3.ggpht.com/ytc/AMLnZu95DPRFRG3ruAfZPsyRza7cV3jdq7qetKz3Emb-XQ=s900-c-k-c0x00ffffff-no-rj" />
                <Typography>{displayName}</Typography>
                <KeyboardArrowDown />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </SizedPaper>
      <MenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <MenuItem
          selected={currentProfile === "PERSONAL"}
          onClick={() => handleMenuItemClick("PERSONAL")}
        >
          <Avatar>1</Avatar> {copy["appDrawer.profile.personal"]}
        </MenuItem>
        {getBusinessList()}
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
