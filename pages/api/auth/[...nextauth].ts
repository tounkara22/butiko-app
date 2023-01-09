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
          if (response?.data != null) {
            const { email, token, userId } = response.data;
            return {
              email,
              id: userId,
              image: token, // we are repurposing this property to store token
              name: userId, // re-purpose for user id
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
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
