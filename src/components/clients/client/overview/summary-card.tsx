import { Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { formatToCurrency } from "../../../../utils/currency";
import { StyledSummaryPaper, SummaryPaperContainer } from "./overview.styles";

export default function SummaryCard() {
  return (
    <SummaryPaperContainer>
      <StyledSummaryPaper>
        <Grid container justifyContent="center" spacing={5}>
          <Grid item>
            <Stack alignItems="center">
              <Chip label="Amount due" size="small" />
              <Typography>{formatToCurrency(Math.abs(50000))}</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack alignItems="center">
              <Chip label="Total spending" size="small" />
              <Typography>{formatToCurrency(Math.abs(230000))}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </StyledSummaryPaper>
    </SummaryPaperContainer>
  );
}
