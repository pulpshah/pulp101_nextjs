import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const userPassword = credentials?.password;
        const userEmail = credentials?.email;

        // Validate password and email
        if (userPassword === process.env.APP_PASSWORD && userEmail) {
          return { id: "1", name: "User", email: userEmail };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // Explicitly set the session strategy to "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
