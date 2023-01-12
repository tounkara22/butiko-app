import { useReactiveVar } from "@apollo/client";
import { CircularProgress, Divider, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { authErrors, authSuccess, passwordFieldNames, signupFieldNames } from "../../../../constants/auth";
import { getSnackbarOptions } from "../../../../utils/snackbar";
import { signupVar } from "../../../apollo-client/globalVars";
import { signupInit } from "../../../apollo-client/initialValues/auth";
import useCopy from "../../../hooks/useCopy";
import { postSignup } from "../../../services/auth/auth";
import { SignupPayload } from "../../../services/auth/type";
import { validateAllFields } from "../../../validation/utils";
import ActionButton from "../../../views/buttons/action-button";
import HideAndShowButton from "../../../views/buttons/hide-show-button";
import { StyledStack, StyledFormContainer, StyledTextfield } from "../styles";
import { SignupFormField } from "../types";
import { authChangeHandler } from "../utils";
import { passwordMatchValidation, signupValidations } from "../validation";
import AuthHeader from "./auth-header";

export default function SignupView() {
  const labelPrefix = "page.signup.form.textfield";

  const { copy } = useCopy();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { email, firstName, lastName, password, passwordConfirm, dob } = useReactiveVar(signupVar);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ password: false, passwordConfirm: false });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  useEffect(() => {
    const onRouteChangeComplete = () => {
      signupVar(signupInit);
    };

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  /**
   * Given the number of years specified, we add or remove it from a provided date
   * By default, date is set to current date
   */
  const numYearsFromDate = (yearsToSubtract: number, date = new Date()) => {
    const year = date.getFullYear() + yearsToSubtract;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const result = `${year}-${month}-${day}`;
    return result;
  };

  /**
   * Given event object, fn attempts to create an account and properly handles errors
   */
  const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const payload: SignupPayload = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: new Date(dob.value),
      email: email.value,
      password: password.value,
    };

    setLoading(true);

    if (
      !validateAllFields(signupFieldNames, signupVar, signupValidations) ||
      !validateAllFields(passwordFieldNames, signupVar, passwordMatchValidation)
    ) {
      setLoading(false);
      return;
    }

    postSignup(payload)
      .then((res) => {
        if (res.data != null) {
          setLoading(false);
          let message = authSuccess.SIGNUP_COMPLETE;
          let variant: VariantType = "success";

          if (res.data.error) {
            message = res.data.error;
            // if (message === "EMAIL_NOT_VERIFIED") {
            //   variant = "warning";
            // }
          }

          enqueueSnackbar(copy[authSuccess[message]], {
            variant,
            autoHideDuration: 4000,
            onClose: () => {
              router.replace("/login");
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      })
      .catch((e: string) => {
        setLoading(false);
        enqueueSnackbar(
          copy[authErrors[e] || authErrors.GENERIC],
          getSnackbarOptions({ variant: "error", duration: 2000 })
        );
      });
  };

  /**
   * Given event and field name, fn triggers the auth event handler
   * While ensuring validation is NOT run for the onChange events
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: SignupFormField
  ) => {
    authChangeHandler({
      model: signupVar,
      fieldName,
      value: e.target.value || "",
      validate: false,
      validationObject: signupValidations,
    });
  };

  /**
   * Given event and field name, fn triggers the auth event handler
   * While ensuring validation IS run for the onChange events
   */
  const handleInputBlur = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    fieldName: SignupFormField,
    dependent?: string
  ) => {
    if (!touched[fieldName as "password" | "passwordConfirm"]) {
      setTouched({ ...touched, [fieldName]: true });
    }

    authChangeHandler({
      model: signupVar,
      fieldName,
      value: e.target.value || "",
      validate: true,
      validationObject: signupValidations,
      dependent,
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
            <StyledTextfield
              InputLabelProps={{ shrink: true, required: true }}
              label={copy[`${labelPrefix}.firstName`]}
              type="text"
              value={firstName.value}
              onChange={(e) => handleInputChange(e, "firstName")}
              onBlur={(e) => handleInputBlur(e, "firstName")}
              error={firstName.error.length ? true : false}
              helperText={copy[firstName.error]}
            />
            <StyledTextfield
              InputLabelProps={{ shrink: true, required: true }}
              label={copy[`${labelPrefix}.lastName`]}
              type="text"
              value={lastName.value}
              onChange={(e) => handleInputChange(e, "lastName")}
              onBlur={(e) => handleInputBlur(e, "lastName")}
              error={lastName.error.length ? true : false}
              helperText={copy[lastName.error]}
            />
          </Stack>
          <StyledTextfield
            label={copy[`${labelPrefix}.dob`]}
            // by default, user must be 18 years or more
            InputProps={{
              inputProps: {
                min: numYearsFromDate(-100),
                max: numYearsFromDate(-18),
              },
            }}
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={dob.value}
            onChange={(e) => handleInputChange(e, "dob")}
            onBlur={(e) => handleInputBlur(e, "dob")}
            error={dob.error.length ? true : false}
            helperText={copy[dob.error]}
          />
          <StyledTextfield
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.email`]}
            type="text"
            value={email.value}
            onChange={(e) => handleInputChange(e, "email")}
            onBlur={(e) => handleInputBlur(e, "email")}
            error={email.error.length ? true : false}
            helperText={copy[email.error]}
          />
          <StyledTextfield
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.password`]}
            type={isPasswordVisible ? "text" : "password"}
            value={password.value}
            onChange={(e) => handleInputChange(e, "password")}
            onBlur={(e) => handleInputBlur(e, "password", touched.password ? "passwordConfirm.signup" : undefined)}
            error={password.error.length ? true : false}
            helperText={copy[password.error]}
            InputProps={{
              endAdornment: (
                <HideAndShowButton
                  setIsVisible={(isVisible) => setPasswordVisible(isVisible)}
                  isVisible={isPasswordVisible}
                />
              ),
            }}
          />
          <StyledTextfield
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.passwordConfirm`]}
            type={isPasswordConfirmVisible ? "text" : "password"}
            value={passwordConfirm.value}
            onChange={(e) => handleInputChange(e, "passwordConfirm")}
            onBlur={(e) => handleInputBlur(e, "passwordConfirm", touched.password ? "password.signup" : undefined)}
            error={passwordConfirm.error.length ? true : false}
            helperText={copy[passwordConfirm.error]}
            InputProps={{
              endAdornment: (
                <HideAndShowButton
                  setIsVisible={(isVisible) => setPasswordConfirmVisible(isVisible)}
                  isVisible={isPasswordConfirmVisible}
                />
              ),
            }}
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
