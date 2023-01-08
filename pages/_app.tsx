import "../styles/globals.css";
import type { AppProps } from "next/app";
import copy from "./../src/copy/en.json";
import { copyVar } from "../src/apollo-client/globalVars";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/apollo-client/client";
import { SnackbarProvider } from "notistack";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Layout from "../src/components/layout/layout";
import { useEffect } from "react";

interface IAppHelper {
  children: JSX.Element | JSX.Element[];
}

function AppHelper({ children }: IAppHelper) {
  // when the user is not logged in, we ensure that they are not seeing the Layout.
  // This way, sign in and sign up take the full screen.
  const { status, data: session } = useSession();
  useEffect(() => {
    // when we load, check the last profile
    console.log("can we", localStorage.getItem("nextauth.message"));
  }, []);
  return (
    <>
      {status === "authenticated" ? (
        <Layout>{children}</Layout>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  copyVar(copy);
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={3}>
          <AppHelper>
            <Component {...pageProps} />
          </AppHelper>
        </SnackbarProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
