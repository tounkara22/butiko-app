import { useReactiveVar } from "@apollo/client";
import { CircularProgress, Divider, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { AuthErrors } from "../../../../constants/auth-errors";
import { getSnackbarOptions } from "../../../../utils/snackbar";
import { signupVar } from "../../../apollo-client/globalVars";
import useCopy from "../../../hooks/useCopy";
import { postSignup } from "../../../services/auth/auth";
import { SignupPayload } from "../../../services/auth/type";
import ActionButton from "../../../views/buttons/action-button";
import { StyledStack, StyledFormContainer, StyledTextfield } from "../styles";
import { SignupFormField } from "../types";
import { authChangeHandler } from "../utils";
import { signupValidations } from "../validation";
import AuthHeader from "./auth-header";

export default function SignupView() {
  const labelPrefix = "page.signup.form.textfield";

  const { copy } = useCopy();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { email, firstName, lastName, password, passwordConfirm, dob } =
    useReactiveVar(signupVar);
  const [loading, setLoading] = useState(false);

  const dateHelper = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    return [year, month, day];
  };

  /**
   * Given the number of years specified, we add or remove it from a provided date
   * By default, date is set to current date
   */
  const numYearsFromDate = (yearsToSubtract: number, d = new Date()) => {
    const year = d.getFullYear() + yearsToSubtract;
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

    postSignup(payload)
      .then((res) => {
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
      })
      .catch((e: { message: string; status: number }) => {
        setLoading(false);
        enqueueSnackbar(
          copy[AuthErrors[e.message] || AuthErrors.GENERIC],
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
    fieldName: SignupFormField
  ) => {
    authChangeHandler({
      model: signupVar,
      fieldName,
      value: e.target.value || "",
      validate: true,
      validationObject: signupValidations,
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
            type="password"
            value={password.value}
            onChange={(e) => handleInputChange(e, "password")}
            onBlur={(e) => handleInputBlur(e, "password")}
            error={password.error.length ? true : false}
            helperText={copy[password.error]}
          />
          <StyledTextfield
            InputLabelProps={{ shrink: true, required: true }}
            label={copy[`${labelPrefix}.passwordConfirm`]}
            type="password"
            value={passwordConfirm.value}
            onChange={(e) => handleInputChange(e, "passwordConfirm")}
            onBlur={(e) => handleInputBlur(e, "passwordConfirm")}
            error={passwordConfirm.error.length ? true : false}
            helperText={copy[passwordConfirm.error]}
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
