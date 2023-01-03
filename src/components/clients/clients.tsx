import { useReactiveVar } from "@apollo/client";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clientsVar } from "../../apollo-client/globalVars";
import { clientRoutes } from "../../constants/routes";
import useCopy from "../../hooks/useCopy";
import { getClients } from "../../services/clients/clients";
import ActionButton from "../../views/buttons/action-button";
import PageHeader from "../../views/containers/page-header";
import ClientCard from "./client-card";

function Clients() {
  const { copy } = useCopy();
  const { allClients } = useReactiveVar(clientsVar);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load all clients when page loads
    getClients().then((response) => {
      setLoading(false);
      if (response?.data) {
        console.log(response?.data);
        clientsVar({
          allClients: Object.values(response.data),
        });
      }
    });
  }, []);

  const onAddNewClient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(clientRoutes.addNew);
  };

  return (
    <>
      <PageHeader title={copy["page.clients.header.title"]}>
        <ActionButton onClick={onAddNewClient} leadingIcon={<PersonAddIcon />}>
          {copy["page.clients.header.addClient"]}
        </ActionButton>
      </PageHeader>
      {loading ? (
        <CircularProgress />
      ) : allClients != null ? (
        <Grid container spacing="50px">
          {allClients.map((client) => (
            <Grid item lg={5} md={6} xl={3} sm={12} xs={12} key={client.id}>
              <ClientCard client={client} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No clients</p>
      )}
    </>
  );
}

export default Clients;
