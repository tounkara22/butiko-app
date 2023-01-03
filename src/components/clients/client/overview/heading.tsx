import { AddCircleOutline } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import useCopy from "../../../../hooks/useCopy";
import PageHeader from "../../../../views/containers/page-header";
import ButtonDropdown from "../../../../views/dropdown/button-dropdown";

interface IProps {
  displayName?: string;
}
export default function OverviewHeading({ displayName }: IProps) {
  const { copy } = useCopy();
  const MENU_ITEMS = [
    {
      id: "new-transaction",
      title: copy["page.client.profile.tabs.overview.transaction"],
      icon: <AddCircleOutline />,
    },
  ];

  return (
    <Box>
      <PageHeader title={displayName}>
        <Button>{copy["all.edit"]} </Button>
        <ButtonDropdown menuItems={MENU_ITEMS} title={copy["all.new"]} />
      </PageHeader>
      <Divider />
    </Box>
  );
}
