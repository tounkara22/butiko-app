import { CircularProgress } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { UserVar } from "../src/apollo-client/globalVars";
import { postUser } from "../src/services/users/users";

export default function HomePage() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const userid = session?.user?.name as string;

        postUser(userid)
          // get the user profile attached with the userid
          // save in the state and update the current-profile
          .then((response) => {
            const { businesses, email, firstName, lastName, userId } =
              response.data;
            let currentProfileId = localStorage?.getItem("current-profile");
            if (
              !currentProfileId ||
              currentProfileId === "undefined" ||
              currentProfileId === null
            ) {
              localStorage.setItem("current-profile", "PERSONAL");
            }

            UserVar({
              email: "eejej@ejje.com",
              businesses: [],
              firstName: "djdd",
              id: "ddjjd",
              lastName: "dhdh",
            });
            // UserVar({
            //   businesses,
            //   email,
            //   firstName,
            //   id: userId,
            //   lastName,
            //   currentProfile: localStorage
            //     ?.getItem("current-profile")
            //     ?.toString(),
            // });
            // console.log("check", UserVar());
          })
          .catch((e) => {
            signOut({
              callbackUrl: "/login",
            });
            throw e;
          });
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
