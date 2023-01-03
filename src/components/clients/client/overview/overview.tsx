import Head from "next/head";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { clientProfileNavTabsToRoute } from "../../../../constants/tabs";
import useCopy from "../../../../hooks/useCopy";
import { getClientOverview } from "../../../../services/clients/clients";
import {
  IClientOverview,
  ClientTabType,
} from "../../../../types/clients/clients";
import InfoPaper from "../../../../views/containers/info-paper";
import PageHeader from "../../../../views/containers/page-header";
import SectionHeader from "../../../../views/containers/section-header";
import Loading from "../../../../views/loading/loading";
import ClientNotFound from "../../client-not-found";
import ClientProfileTabs from "../../client-profile-tabs";
import OverviewHeading from "./heading";
import UnpaidTransactions from "./unpaid-transactions";
import SummaryCard from "./summary-card";

interface IOverview {
  clientId: string;
}

export default function ClientOverview({ clientId }: IOverview) {
  const [clientOverview, setClientOverview] = useState<IClientOverview>();
  const [isLoading, setLoading] = useState(false);
  const { copy } = useCopy();
  const router = useRouter();

  useEffect(() => {
    if (clientId != null) {
      setLoading(true);
      getClientOverview(clientId).then((response) => {
        setClientOverview(response?.data);
        setLoading(false);
      });
      setLoading(false);
    }
  }, [clientId]);

  if (isLoading || !clientOverview || !Object.keys(clientOverview).length) {
    return <Loading size="lg" />;
  }

  const { clientSnapshot, transactions } = clientOverview;

  const handleTabChanged = (e: SyntheticEvent, newValue: ClientTabType) => {
    router.push(
      `/clients/${clientSnapshot.id}${
        clientProfileNavTabsToRoute[newValue] || "/"
      }`
    );
  };

  return (
    <>
      <Head>
        <title>
          {clientSnapshot.displayName
            ? `${clientSnapshot.displayName}'s profile`
            : "Client profile"}
        </title>
      </Head>
      <OverviewHeading displayName={clientSnapshot.displayName} />
      <ClientProfileTabs onTabChange={handleTabChanged} />

      <SummaryCard />
      <UnpaidTransactions txList={transactions.outstandingTx || []} />
    </>
  );
}
