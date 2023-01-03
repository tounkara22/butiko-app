import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useCopy from "../../../../hooks/useCopy";
import { TransactionShort } from "../../../../types/clients/clients";
import InfoPaper from "../../../../views/containers/info-paper";
import SectionHeader from "../../../../views/containers/section-header";

interface IUnpaidTransactions {
  txList: TransactionShort[];
}

const MAX_NUM_LIST_ITEMS = 4;

export default function UnpaidTransactions({ txList }: IUnpaidTransactions) {
  const { copy } = useCopy();
  const title = copy["page.client.profile.tabs.overview.transactionsToPay"];
  const SectionTitleComponent = (
    <SectionHeader title={title}>
      <Button>View all</Button>
    </SectionHeader>
  );

  // there is a list
  if (txList != null && txList.length) {
    const copyPrefix =
      "page.client.profile.tabs.overview.transactionsToPay.table.";

    return (
      <>
        {SectionTitleComponent}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{copy[`${copyPrefix}item`]}</TableCell>
                <TableCell>{copy[`${copyPrefix}totalReceived`]}</TableCell>
                <TableCell>{copy[`${copyPrefix}totalCost`]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txList.map((tx) => (
                <TableRow
                  key={tx.itemId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tx.item}
                  </TableCell>
                  <TableCell>{tx.totalReceived}</TableCell>
                  <TableCell>{tx.totalCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  return (
    <>
      {SectionTitleComponent}
      <InfoPaper>
        <Typography>No outstanding transactions</Typography>
      </InfoPaper>
    </>
  );
}
