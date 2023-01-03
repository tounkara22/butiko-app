import Head from "next/head";
import Clients from "../../src/components/clients/clients";
import useCopy from "../../src/hooks/useCopy";

export default function ClientsPage() {
  const { copy } = useCopy();

  return (
    <>
      <Head>
        <title>{copy["page.clients.header.title"]}</title>
      </Head>
      <Clients />
    </>
  );
}
