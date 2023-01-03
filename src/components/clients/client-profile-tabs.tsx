import { useReactiveVar } from "@apollo/client";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { SyntheticEvent } from "react";
import { setClientProfileTab } from "../../apollo-client/globalVars";
import { clientProfileNavTabs } from "../../constants/tabs";
import useCopy from "../../hooks/useCopy";
import { ClientTabType } from "../../types/clients/clients";

interface IClientProfileTabs {
  onTabChange: (e: SyntheticEvent, newValue: ClientTabType) => void;
}

export default function ClientProfileTabs({ onTabChange }: IClientProfileTabs) {
  const { copy } = useCopy();
  const selectedTab = useReactiveVar(setClientProfileTab);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={selectedTab} onChange={onTabChange} centered>
          {clientProfileNavTabs.map((navTab) => (
            <Tab label={copy[navTab.title]} value={navTab.id} key={navTab.id} />
          ))}
        </Tabs>
      </Box>
    </>
  );
}
