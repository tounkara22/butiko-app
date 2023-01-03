import { useRouter } from "next/router";
import { setClientProfileTab } from "../../../src/apollo-client/globalVars";
import ClientOverview from "../../../src/components/clients/client/overview/overview";

export default function ClientOverviewPage() {
  setClientProfileTab("CLIENT_OVERVIEW");
  const router = useRouter();
  const { clientId } = router.query;

  return (
    <ClientOverview
      clientId={clientId && typeof clientId === "string" ? clientId : ""}
    />
  );
}
