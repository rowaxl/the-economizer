import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// @ts-ignore
export default NextAuth({
  pages: {
    signIn: '/'
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async signIn(user: any) {
      const isAllowedToSignIn = user ? true : false

      return isAllowedToSignIn
    },
    async redirect(url: string, baseUrl: string) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
      if (account?.accesstoken) {
        token.accessToken = account.accessToken
      }

      return token
    },
    async session(session: any, token: any) {
      session.accessToken = token.accessToken
      return session
    }
  }
})