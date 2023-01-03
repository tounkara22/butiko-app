import Head from "next/head";
import NewClient from "../../../src/components/clients/new-client";
import useCopy from "../../../src/hooks/useCopy";

export default function NewClientPage() {
  const { copy } = useCopy();
  return (
    <>
      <Head>
        <title>{copy["page.newClient.header.title"]}</title>
      </Head>
      <NewClient />
    </>
  );
}
