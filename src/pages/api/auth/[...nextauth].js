import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendLogin } from "@/graphql/auth";
import { userStore } from "@/stores/dataStore";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: "Username",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
        if (!credentials.username || !credentials.password) {
          return null;
        }
        const user = await sendLogin(credentials.username, credentials.password);
        console.log("user", user);
        
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
  // A secret to use for key generation (e.g. JWT, session, etc.)
  secret: process.env.NEXTAUTH_SECRET,
  // You can add custom pages for sign in, sign out, error, verify request, and new account
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newAccount: "/auth/register", // New account creation (e.g. signup)
  },
  jwt: {
    // Set the maximum age of the JWT in seconds
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // You can set the encryption algorithm used to sign the JWT
    encryption: true,
    // You can set the signing algorithm used to sign the JWT
  },
  // Callbacks for JWT and session
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signIn", { user, account, profile, email, credentials });
      return user
    },
    async session({ session, user, token }) {
      // console.log("session", { session, user, token });
      // add user id to session
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.username;
      session.user.image = null;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt", { token, user, account, profile, isNewUser });
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token
    }
  },
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === "development",
  // Session configuration
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
