import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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
    strategy: "jwt" as const, // Use JWT session
  },
  secret: process.env.NEXTAUTH_SECRET,
};
