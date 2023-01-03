import {
  Avatar,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ClientSummary } from "../../types/clients/clients";
import {
  StyledCard,
  StyledPaper,
  StyledCardHeaderSubtitle,
  StyledCardHeaderTitle,
} from "./clients.styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import UpdateIcon from "@mui/icons-material/Update";
import { formatToCurrency } from "../../utils/currency";
import { useState } from "react";
import MenuDropdown from "../../views/dropdown/menu-dropdown";
import useCopy from "../../hooks/useCopy";

type ClientType = {
  client: ClientSummary;
};

export default function ClientCard({ client }: ClientType) {
  const { id, displayName, outstandingBalance, lastUpdate } = client;
  const currBalance = parseFloat(outstandingBalance);
  const isBalanceDue = currBalance < 0;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { copy } = useCopy();
  const router = useRouter();

  const onClientSelected = () => {
    router.push(`/clients/${id}/overview`);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _CardHeaderAvatar = <Avatar>{displayName && displayName[0]}</Avatar>;

  const _CardHeaderAction = (
    <IconButton aria-label="settings" onClick={handleOpen}>
      <MoreVertIcon />
    </IconButton>
  );

  const _MenuItemsComponent: JSX.Element[] = [
    <MenuItem onClick={onClientSelected}>
      {copy["page.clients.card.view"]}
    </MenuItem>,
    <MenuItem>{copy["page.clients.card.edit"]}</MenuItem>,
    <MenuItem>{copy["page.clients.card.new"]}</MenuItem>,
    <Divider />,
    <MenuItem>{copy["page.clients.card.remove"]}</MenuItem>,
  ];

  return (
    <>
      <StyledCard elevation={1}>
        <CardActionArea onClick={onClientSelected}>
          <CardHeader
            avatar={_CardHeaderAvatar}
            title={<StyledCardHeaderTitle>{displayName}</StyledCardHeaderTitle>}
            subheader={
              <StyledCardHeaderSubtitle fontSize="12px">
                <UpdateIcon fontSize="small" />
                {moment(parseInt(lastUpdate || "")).calendar()}
              </StyledCardHeaderSubtitle>
            }
            action={_CardHeaderAction}
          />
          <CardContent>
            <StyledPaper elevation={0}>
              <Grid container justifyContent={"space-around"}>
                <Grid item>
                  <Typography color={isBalanceDue ? "red" : "darkgreen"}>
                    {formatToCurrency(Math.abs(currBalance))}
                  </Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </CardContent>
        </CardActionArea>
      </StyledCard>
      <MenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        {_MenuItemsComponent}
      </MenuDropdown>
    </>
  );
}
