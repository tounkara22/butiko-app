import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { setClientProfileTab } from "../../../src/apollo-client/globalVars";
import ClientProfileTabs from "../../../src/components/clients/client-profile-tabs";
import { clientProfileNavTabsToRoute } from "../../../src/constants/tabs";
import { getClientTransactions } from "../../../src/services/clients/clients";
import { Client, ClientTabType } from "../../../src/types/clients/clients";
import PageHeader from "../../../src/views/containers/page-header";

export default function ClientTransactionsPage() {
  const router = useRouter();
  setClientProfileTab("CLIENT_TRANSACTIONS");

  const { clientId } = router.query;
  const [client, setClientData] = useState<Client>();

  useEffect(() => {
    if (typeof clientId === "string") {
      getClientTransactions(clientId).then((response) => {
        setClientData(response?.data);
      });
    } else {
      router.push("/clients");
    }
  }, [clientId]);

  if (!client) {
    return <h1>No client found</h1>;
  }

  const handleTabChanged = (e: SyntheticEvent, newValue: ClientTabType) => {
    const newRouteToken = clientProfileNavTabsToRoute[newValue] || "/";
    router.push(`/clients/${clientId}${newRouteToken}`);
  };

  return (
    <>
      <PageHeader title={client.displayName}></PageHeader>
      <Divider />
      <ClientProfileTabs onTabChange={handleTabChanged} />
    </>
  );
}
