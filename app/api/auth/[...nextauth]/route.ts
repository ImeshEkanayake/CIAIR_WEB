import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabaseAdmin } from "@/lib/supabase"

// This is a simple authentication setup for the CMS
// In a production environment, you would want to use a more secure approach

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Fetch user from Supabase
        const { data: user, error } = await supabaseAdmin
          .from("admins")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) {
          return null
        }

        // Simple password check (for demo purposes only)
        // In production, you should use proper password hashing
        const passwordMatch = credentials.password === user.password

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as typeof session.user & { id?: string }).id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
