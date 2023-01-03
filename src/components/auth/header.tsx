import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import useCopy from "../../hooks/useCopy";
import ActionButton from "../../views/buttons/action-button";
import {
  StyledHeaderContainer,
  StyledLogoDiv,
  StyledToolbar,
} from "./auth.styles";

interface IAuthHeader {
  nextLink?: "/login" | "/signup";
  title?: "login" | "signup" | "activate";
}
export default function AuthHeader({ nextLink, title }: IAuthHeader) {
  const { copy } = useCopy();
  const router = useRouter();

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (nextLink) {
      router.push(nextLink);
    }
  };

  return (
    <StyledHeaderContainer>
      <Stack width={"100%"} height="100%">
        <StyledToolbar>
          <StyledLogoDiv>
            <Typography variant="h3" fontWeight="bolder" fontSize={"32px"}>
              {copy["all.logo"]}
            </Typography>
          </StyledLogoDiv>

          {nextLink && (
            <ActionButton onClick={handlePageChange}>
              {copy[`page.${title}.header.nextLink`]}
            </ActionButton>
          )}
        </StyledToolbar>
      </Stack>
      <Typography fontSize="32px" fontWeight={"100px"}>
        {copy[`page.${title}.header.title`]}
      </Typography>
    </StyledHeaderContainer>
  );
}
