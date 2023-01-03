import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import router from "next/router";
import useCopy from "../../hooks/useCopy";
import ActionButton from "../../views/buttons/action-button";
import PageHeader from "../../views/containers/page-header";

interface IClientNotFound {
  pageTitle?: string;
  title?: string;
  body?: string;
  actionText?: string;
}

export default function ClientNotFound({
  pageTitle,
  title,
  body,
  actionText,
}: IClientNotFound) {
  const { copy } = useCopy();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <PageHeader title={title} />
      <Stack
        spacing={5}
        alignItems="center"
        height="50vh"
        justifyContent="center"
      >
        <Typography variant="body1" textAlign="center">
          {body}
        </Typography>
        <ActionButton onClick={() => router.replace("/clients")}>
          {actionText || ""}
        </ActionButton>
      </Stack>
    </>
  );
}
