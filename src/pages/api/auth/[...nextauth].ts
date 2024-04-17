import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true
      }
    }
  },
  debug: false,
  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, account, profile);
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) {
      /* on successful sign in */ console.log(message);
    },
    async signOut(message) {
      /* on signout */ console.log(message);
    },
    async createUser(message) {
      /* user created */ console.log(message);
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */ console.log(message);
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */ console.log(message);
    },
    async session(message) {
      /* session is active */
      // console.log(message);
    }
    // async error(message) {
    //   /* error in authentication flow */ console.log(message);
    // }
  }
};

export default (req, res) => NextAuth(req, res, nextAuthOptions);
