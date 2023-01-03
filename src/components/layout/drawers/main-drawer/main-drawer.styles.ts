import styled from "@emotion/styled";
import { ListItem } from "@mui/material";

export const StyledListItem = styled(ListItem)((props) => ({
  backgroundColor: props.isSelected && "rgba(25, 118, 210, 0.08)",
}));
