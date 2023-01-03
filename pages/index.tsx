import { CircularProgress } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []);

  if (auth === true) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <h1>Landing page</h1>
      </>
    );
  }
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
