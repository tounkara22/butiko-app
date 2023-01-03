import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import SignupView from "../src/components/auth/signup";

export default function SignupPage() {
  return <SignupView />;
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
