import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { name, password, email, phone, gender } = credentials;
        console.log('Credentials:', { name, phone, email, password, gender }); 
        const NextAuthUser = { name, email, password }

        try {
          const response = await fetch('https://v3.nagadhat.com/api/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password, email, phone, gender}),
          });

          const user = await response.json();

          if (user && user.success) {
            console.log('User:', user); 
            console.log('Sign In successfully');
            return NextAuthUser;
          } else {
            console.error('Authentication failed:', user);
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin', 
  },
});
export { handler as GET, handler as POST };
