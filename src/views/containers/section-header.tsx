import { Typography } from "@mui/material";
import { PageHeaderDiv } from "./containers.styles";

interface ISectionHeader {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  center?: boolean;
}

export default function SectionHeader({
  title,
  children,
  center,
}: ISectionHeader) {
  return (
    <PageHeaderDiv>
      <Typography variant="h6">{title}</Typography>
      {children}
    </PageHeaderDiv>
  );
}
