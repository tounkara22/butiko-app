import { CircularProgress, Divider } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { getSnackbarOptions } from "../../../utils/snackbar";
import useCopy from "../../hooks/useCopy";
import ActionButton from "../../views/buttons/action-button";
import {
  StyledStack,
  StyledFormContainer,
  StyledTextfield,
} from "./auth.styles";
import AuthHeader from "./header";
import { signIn } from "next-auth/react";
import { useReactiveVar } from "@apollo/client";
import { LoginVar } from "../../apollo-client/globalVars";
import { loginChangeHandler } from "./auth.utils";
import { validateAllFields } from "../../validation/utils";
import { LoginValidations } from "./auth.validation";

export default function LoginView() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopy();
  const [loading, setLoading] = useState(false);
  const { email, password } = useReactiveVar(LoginVar);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!validateAllFields(["email", "password"], LoginVar, LoginValidations)) {
      setLoading(false);
      return;
    }
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.value,
        password: password.value,
      });

      // login failed
      if (result?.error != null) {
        setLoading(false);
        enqueueSnackbar(
          copy[`all.errors.${result.error || "generic"}`],
          getSnackbarOptions({ variant: "error", duration: 2000 })
        );
      } else {
        // when we load, check the last profile
        router.replace("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: "email" | "password"
  ) => {
    loginChangeHandler({
      model: LoginVar,
      fieldName,
      value: e.target.value || "",
      validate: false,
    });
  };
  const handleInputBlur = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: "email" | "password"
  ) => {
    loginChangeHandler({
      model: LoginVar,
      fieldName,
      value: e.target.value || "",
      validate: true,
    });
  };

  return (
    <>
      <Head>
        <title>{copy["page.login.header.title"]}</title>
      </Head>
      <StyledStack>
        <AuthHeader title="login" nextLink="/signup" />
        <StyledFormContainer>
          <StyledTextfield
            required
            label={copy["page.login.form.textfield.email"]}
            type="email"
            value={email.value}
            error={email.error.length ? true : false}
            helperText={copy[email.error]}
            onChange={(e) => handleInputChange(e, "email")}
            onBlur={(e) => handleInputBlur(e, "email")}
          />
          <StyledTextfield
            required
            label={copy["page.login.form.textfield.password"]}
            type="password"
            value={password.value}
            error={password.error.length ? true : false}
            helperText={copy[password.error]}
            onBlur={(e) => handleInputBlur(e, "password")}
            onChange={(e) => handleInputChange(e, "password")}
          />
          <Divider />
          <ActionButton onClick={handleSubmit}>
            {loading ? <CircularProgress /> : copy["page.login.button"]}
          </ActionButton>
        </StyledFormContainer>
      </StyledStack>
    </>
  );
}
