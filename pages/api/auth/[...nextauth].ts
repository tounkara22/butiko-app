import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postLogin } from "../../../src/services/auth/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await postLogin({ email, password });
          if (response?.data != null && !response?.data?.error) {
            return {
              email: email,
              id: response.data.userId,
            };
          }
        } catch (e) {
          throw e;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token }) {
      return token;
    },
  },
});
