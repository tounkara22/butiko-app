import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { StyledStack } from "../src/components/auth/styles";
import AuthHeader from "../src/components/auth/auth-header";
import useCopy from "../src/hooks/useCopy";
import { postActivateAccount } from "../src/services/auth/auth";
import { ActivatePayload } from "../src/services/auth/type";
import { getSnackbarOptions } from "../utils/snackbar";
import InfoPaper from "../src/views/containers/info-paper";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import ActionButton from "../src/views/buttons/action-button";
import { Box } from "@mui/system";

export default function ActivatePage() {
  const router = useRouter();
  const { copy } = useCopy();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState<boolean | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { token, id } = router.query;

  useEffect(() => {
    if (token != null && id != null) {
      setLoading(true);
      const payload: ActivatePayload = {
        id: id as string,
        token: token as string,
      };
      postActivateAccount(payload)
        .then((response) => {
          setLoading(false);
          if (response?.data?.userid != null) {
            setSuccess(true);
            enqueueSnackbar(
              copy[`page.activate.snackbar.success`],
              getSnackbarOptions({
                variant: "success",
                duration: 2000,
                callback: () => router.push("/login"),
              })
            );
          }
        })
        .catch((e) => {
          const { message } = e;
          setLoading(false);
          setSuccess(false);
          enqueueSnackbar(
            copy[`all.errors.${message || "generic"}`],
            getSnackbarOptions({ variant: "error", duration: 2000 })
          );
        });
    }
  }, [token, id]);
  return (
    <>
      <Head>
        <title>{copy["page.activate.header.title"]}</title>
      </Head>
      <StyledStack>
        <AuthHeader title="activate" />
        <InfoPaper fullHeight>
          {loading || !isSuccess ? (
            <CircularProgress />
          ) : (
            <>
              <Typography>
                {isSuccess
                  ? copy["page.activate.success"]
                  : copy["page.activate.failure"]}
              </Typography>
              {!isSuccess && (
                <>
                  <Divider />
                  <Box sx={{ marginTop: "20px" }}>
                    <ActionButton onClick={() => router.replace("/login")}>
                      {copy["page.activate.toLogin"]}
                    </ActionButton>
                  </Box>
                </>
              )}
            </>
          )}
        </InfoPaper>
      </StyledStack>
    </>
  );
}
