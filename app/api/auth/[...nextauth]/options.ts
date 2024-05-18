import connectMongoDB from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/app/auth/models/admin";
import bcrypt from "bcryptjs";
export const options: NextAuthOptions = {
  pages: {
    signIn: '/auth/signIn',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter id number / first name",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }
          await connectMongoDB();
          const adminsFound = await Admin.find({ $or: [{ fName: credentials.username.toUpperCase() }, { idNo: credentials.username }] });
          // Combine users and admins into one array
          let verifiedAccounts = []
          if (adminsFound.length === 0) {
            return null;
          }

          // Check password for each found user
          for (const userFound of adminsFound) {
            const isPasswordsMatch = bcrypt.compareSync(
              credentials.password,
              userFound.password
            );
            if (isPasswordsMatch) {
              verifiedAccounts.push(userFound)
            }
          }
          // Sort verified accounts by role in descending order (EM-203 -> EM-202 -> EM-201)
          verifiedAccounts.sort((a, b) => {
            const { role: roleA } = a;
            const { role: roleB } = b;
            const roleOrder: any = { "EM-201": 1, "EM-202": 2, "EM-203": 3 };
            return roleOrder[roleB] - roleOrder[roleA];
          });


          // Return user with highest role
          if (verifiedAccounts.length > 0) {
            return verifiedAccounts[0];
          }
          // If no matching user found or passwords don't match, return null
          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.name = user.fName;
        token.idNo = user.idNo;
        token.isContactVerified = user.isContactVerified || true
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.idNo = token.idNo;
        session.user.isContactVerified = token.isContactVerified;
      }
      return session;
    },
  },
};
