import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import LoginView from "../src/components/auth/views/login-view";

export default function LoginPage() {
  return <LoginView />;
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
