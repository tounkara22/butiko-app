import { Divider } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { setClientProfileTab } from "../../../src/apollo-client/globalVars";
import ClientNotFound from "../../../src/components/clients/client-not-found";
import ClientProfileTabs from "../../../src/components/clients/client-profile-tabs";
import { clientProfileNavTabsToRoute } from "../../../src/constants/tabs";
import useCopy from "../../../src/hooks/useCopy";
import { getClientContacts } from "../../../src/services/clients/clients";
import { IClientContact } from "../../../src/services/clients/type";
import { ClientTabType } from "../../../src/types/clients/clients";
import PageHeader from "../../../src/views/containers/page-header";

export default function ClientContactsPage() {
  const router = useRouter();
  const { clientId } = router.query;
  const [clientContactObj, setClientContactsData] = useState<IClientContact>();
  setClientProfileTab("CLIENT_CONTACTS");
  const { copy } = useCopy();

  useEffect(() => {
    if (clientId && typeof clientId === "string") {
      getClientContacts(clientId).then((response) => {
        setClientContactsData(response?.data);
      });
    }
  }, [clientId]);

  if (!clientContactObj || !Object.keys(clientContactObj).length) {
    return (
      <ClientNotFound
        pageTitle={copy["page.client.profile.noProfile.title"]}
        title={copy["page.client.profile.noProfile.errorTitle"]}
        body={copy["page.client.profile.noProfile.errorBody"]}
        actionText={copy["page.client.profile.noProfile.myClientsButton"]}
      />
    );
  }

  const handleTabChanged = (e: SyntheticEvent, newValue: ClientTabType) => {
    router.push(
      `/clients/${clientId}${clientProfileNavTabsToRoute[newValue] || "/"}`
    );
  };

  return (
    <>
      <Head>
        <title>
          {clientContactObj.displayName
            ? `${clientContactObj.displayName}'s profile`
            : "Client profile"}
        </title>
      </Head>
      <PageHeader title={clientContactObj.displayName}></PageHeader>
      <Divider />
      <ClientProfileTabs onTabChange={handleTabChanged} />
      <h1>Hellow Contacts</h1>
    </>
  );
}
