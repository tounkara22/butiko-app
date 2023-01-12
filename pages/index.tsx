import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
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
        let currentProfileId = localStorage?.getItem("current-profile");

        postUser(userid)
          .then((response) => {
            const userObj = response?.data;
            if (!userObj) {
              signOut({ callbackUrl: "/login" });
            }

            const { businesses, email, firstName, lastName, userId } =
              response?.data;
            if (
              !currentProfileId ||
              currentProfileId === "undefined" ||
              currentProfileId === null
            ) {
              currentProfileId = "PERSONAL";
              localStorage.setItem("current-profile", currentProfileId);
            }

            UserVar({
              email,
              businesses,
              firstName,
              id: userId,
              lastName,
              currentProfile: currentProfileId,
            });
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
