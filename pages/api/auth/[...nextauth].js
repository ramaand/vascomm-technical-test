import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import bcrypt from 'bcrypt'

import clientPromise, { connectMongoDB } from '@/config/database/connection'
import User from '@/config/database/models/user'

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();

          const user = await User.findOne({ email, isActive: true });

          if (!user) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) return null;

          return user;
        } catch (error) {
          console.log('Error', error);
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
