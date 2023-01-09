import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
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
import { loginInit } from "../../apollo-client/initialValues/auth";
import { navigationConstants as constants } from "../../../constants/navigation";

export default function LoginView() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopy();
  const [loading, setLoading] = useState(false);
  const { email, password } = useReactiveVar(LoginVar);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const onRouteChangeComplete = () => {
      if (checked) localStorage.setItem(constants.REMEMBER_ME, email.value);
      LoginVar(loginInit);
    };

    const rememberedEmail = localStorage.getItem(constants.REMEMBER_ME);
    if (rememberedEmail != null) {
      LoginVar({
        ...LoginVar(),
        email: { ...LoginVar().email, value: rememberedEmail.toString() },
      });
    } else {
      setChecked(false);
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

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

  const handleCheckboxChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    if (!isChecked) {
      localStorage.removeItem(constants.REMEMBER_ME);
    } else {
      localStorage.setItem(constants.REMEMBER_ME, email.value);
    }
    setChecked(event.target.checked);
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
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleCheckboxChanged} />
            }
            label={copy["page.login.form.checkbox.rememberMe"]}
          />
          <Divider />
          <ActionButton onClick={handleSubmit}>
            {loading
              ? copy["page.login.button.loading"]
              : copy["page.login.button"]}
          </ActionButton>
          {/* <CenteredDiv>
            <a href="/">Reset password</a>
          </CenteredDiv> */}
        </StyledFormContainer>
      </StyledStack>
    </>
  );
}
