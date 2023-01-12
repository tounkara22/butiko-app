import { useRouter } from "next/router";
import useCopy from "../../hooks/useCopy";
import ActionButton from "../../views/buttons/action-button";
import PageHeader from "../../views/containers/page-header";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Stack } from "@mui/system";
import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Client } from "../../types/clients/clients";
import { clientsVar } from "../../apollo-client/globalVars";
import { addNewClient } from "../../services/clients/clients";

export default function NewClient() {
  const { copy } = useCopy();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSaveClient = () => {
    if (displayName && displayName.length > 5) {
      const currDate = Date.now().toString();
      const newClient: Client = {
        id: currDate + "-id",
        displayName: displayName,
        dateAdded: currDate,
        primaryContact: currDate + "contact-id",
      };
      if (
        firstName.length ||
        lastName.length ||
        email.length ||
        phoneNumber.length
      ) {
        newClient.contacts = [
          {
            ...(firstName.length && {
              imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Green_rectangle.svg/2560px-Green_rectangle.svg.png",
            }),
            ...(firstName.length && { id: currDate + "-contact-id" }),
            ...(email.length && { email }),
            ...(firstName.length && { firstName }),
            ...(lastName.length && { lastName }),
            ...(phoneNumber.length && { phoneNumber }),
          },
        ];
      }

      clientsVar().allClients.push(newClient);
      addNewClient(newClient);
      router.push("/clients");
    }
  };

  return (
    <>
      <PageHeader title={copy["page.newClient.header.title"]}>
        <ActionButton
          onClick={() => router.back()}
          leadingIcon={<KeyboardBackspaceIcon />}
        >
          {copy["all.cancel"]}
        </ActionButton>
      </PageHeader>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          display: "flex",
        }}
      >
        <Card
          elevation={5}
          sx={{
            width: "500px",
            padding: "50px 20px",
            marginTop: "50px",
            borderRadius: "20px",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              {copy["page.newClient.title"]}
            </Typography>

            <TextField
              variant="filled"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              required
              label={copy["page.newClient.displayName"]}
            />
            <Stack direction="row" spacing={1}>
              <InfoIcon fontSize="small" sx={{ color: "gray" }} />
              <Typography variant="caption" sx={{ color: "black" }}>
                {copy["page.newClient.instruction"]}
              </Typography>
            </Stack>
            <Divider />
            <TextField
              variant="filled"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              label={copy["page.newClient.firstName"]}
            />
            <TextField
              variant="filled"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              label={copy["page.newClient.lastName"]}
              value={lastName}
            />
            <TextField
              variant="filled"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              label={copy["page.newClient.phoneNumber"]}
              value={phoneNumber}
            />
            <TextField
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label={copy["page.newClient.email"]}
              value={email}
            />

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button onClick={() => router.push("/clients")}>
                {copy["all.cancel"]}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onSaveClient}
              >
                {copy["all.save"]}
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </>
  );
}
