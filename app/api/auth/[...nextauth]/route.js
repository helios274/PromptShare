import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { compare } from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          await connectToDB();
          const user = await User.findOne({
            username: credentials.username,
          });
          if (!user) {
            throw new Error("Account doesn't exists. Sign up now.");
          }
          const pwdMatch = await compare(credentials.password, user.password);
          if (!pwdMatch) {
            throw new Error("Invalid Password!");
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          await connectToDB();
          const userExists = await User.findOne({
            email: profile.email,
          });
          if (!userExists) {
            const randomStr = Math.random().toString(36).substring(2, 7);
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase() + randomStr,
              image: profile.picture,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
