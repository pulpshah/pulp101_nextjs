import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },  // Capture email during authentication
      },
      async authorize(credentials) {
        const userPassword = credentials?.password;
        const userEmail = credentials?.email;

        // Validate password and ensure email exists
        if (userPassword === process.env.APP_PASSWORD && userEmail) {
          // Return user object with email
          return { id: "1", name: "User", email: userEmail };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // or "database" for session storage in a database
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
