import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

// @ts-ignore
export default NextAuth({
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
    async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
      if (account?.accesstoken) {
        token.accessToken = account.accessToken
      }

      console.log({ user, profile, isNewUser })

      return token
    }
  }
})