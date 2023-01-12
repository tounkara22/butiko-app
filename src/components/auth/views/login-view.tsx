import { Checkbox, Divider, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getSnackbarOptions } from "../../../../utils/snackbar";
import useCopy from "../../../hooks/useCopy";
import ActionButton from "../../../views/buttons/action-button";
import { StyledStack, StyledFormContainer, StyledTextfield } from "../styles";
import AuthHeader from "./auth-header";
import { signIn } from "next-auth/react";
import { useReactiveVar } from "@apollo/client";
import { loginVar } from "../../../apollo-client/globalVars";
import { authChangeHandler } from "../utils";
import { validateAllFields } from "../../../validation/utils";
import { loginValidations } from "../validation";
import { loginInit } from "../../../apollo-client/initialValues/auth";
import { navigationConstants as constants } from "../../../../constants/navigation";
import { LoginFormField } from "../types";
import HideAndShowButton from "../../../views/buttons/hide-show-button";
import { authErrors } from "../../../../constants/auth";

export default function LoginView() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopy();
  const [loading, setLoading] = useState(false);
  const { email, password } = useReactiveVar(loginVar);
  const [checked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const onRouteChangeComplete = () => {
      if (checked && email.value) localStorage.setItem(constants.REMEMBER_ME, email.value);
      loginVar(loginInit);
    };

    const rememberedEmail = localStorage.getItem(constants.REMEMBER_ME);
    if (rememberedEmail != null && rememberedEmail !== "") {
      loginVar({
        ...loginVar(),
        email: { ...loginVar().email, value: rememberedEmail.toString() },
      });
      setChecked(true);
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    if (!validateAllFields(["email", "password"], loginVar, loginValidations)) {
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
          copy[authErrors[result.error || "GENERIC"]],
          getSnackbarOptions({ variant: "error", duration: 2000 })
        );
      } else {
        router.replace("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: LoginFormField
  ) => {
    authChangeHandler({
      model: loginVar,
      fieldName,
      value: e.target.value || "",
      validate: false,
      validationObject: loginValidations,
    });
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, fieldName: LoginFormField) => {
    authChangeHandler({
      model: loginVar,
      fieldName,
      value: e.target.value || "",
      validate: true,
      validationObject: loginValidations,
    });
  };

  /**
   * If flag is checked and there is an email typed, store the value
   */
  const handleCheckboxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (!isChecked) {
      localStorage.removeItem(constants.REMEMBER_ME);
    } else {
      if (email.value && email.value.length) {
        localStorage.setItem(constants.REMEMBER_ME, email.value);
      } else {
        localStorage.removeItem(constants.REMEMBER_ME);
      }
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
            type={isPasswordVisible ? "text" : "password"}
            value={password.value}
            error={password.error.length ? true : false}
            helperText={copy[password.error]}
            onBlur={(e) => handleInputBlur(e, "password")}
            onChange={(e) => handleInputChange(e, "password")}
            InputProps={{
              endAdornment: (
                <HideAndShowButton
                  setIsVisible={(isVisible) => setPasswordVisible(isVisible)}
                  isVisible={isPasswordVisible}
                />
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChanged} />}
            label={copy["page.login.form.checkbox.rememberMe"]}
          />
          <Divider />
          <ActionButton onClick={handleSubmit}>
            {loading ? copy["page.login.button.loading"] : copy["page.login.button"]}
          </ActionButton>
          {/* <CenteredDiv>
            <a href="/">Reset password</a>
          </CenteredDiv> */}
        </StyledFormContainer>
      </StyledStack>
    </>
  );
}
