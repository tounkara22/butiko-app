import { Box, Typography } from "@mui/material";
import { PageHeaderDiv } from "./containers.styles";

interface IPageHeader {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  center?: boolean;
}

export default function PageHeader({ title, children, center }: IPageHeader) {
  return (
    <PageHeaderDiv>
      <Typography variant="h4">{title}</Typography>
      <Box>{children}</Box>
    </PageHeaderDiv>
  );
}
