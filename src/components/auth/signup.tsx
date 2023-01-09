import { CircularProgress, Divider, Stack, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import useCopy from "../../hooks/useCopy";
import { postSignup } from "../../services/auth/auth";
import { SignupPayload } from "../../services/auth/type";
import ActionButton from "../../views/buttons/action-button";
import { StyledStack, StyledFormContainer } from "./auth.styles";
import AuthHeader from "./header";

export default function SignupView() {
  const { copy } = useCopy();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const labelPrefix = "page.signup.form.textfield";

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const payload: SignupPayload = {
      firstName,
      lastName,
      dateOfBirth: new Date(dob),
      email,
      password,
    };
    setLoading(true);
    postSignup(payload).then((res) => {
      if (res.data != null) {
        setLoading(false);
        enqueueSnackbar(
          <div style={{ width: "600px" }}>
            {copy["page.signup.snackbar.success"]}
          </div>,
          {
            variant: "success",
            autoHideDuration: 4000,
            onClose: () => {
              router.replace("/login");
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      }
    });
  };
  return (
    <>
      <Head>
        <title>{copy["page.signup.header.title"]}</title>
      </Head>
      <StyledStack>
        <AuthHeader nextLink="/login" title="signup" />
        <StyledFormContainer>
          <Stack direction="row" justifyContent="space-between">
            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              label={copy[`${labelPrefix}.firstName`]}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              label={copy[`${labelPrefix}.lastName`]}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>
          <TextField
            label={copy[`${labelPrefix}.dob`]}
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.email`]}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.password`]}
            placeholder={copy[`${labelPrefix}.password.placeholder`]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.passwordConfirm`]}
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Divider />
          <ActionButton onClick={handleSignup}>
            {loading ? <CircularProgress /> : copy["page.signup.button"]}
          </ActionButton>
        </StyledFormContainer>
      </StyledStack>
    </>
  );
}
