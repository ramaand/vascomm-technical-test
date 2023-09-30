import { getServerSession } from 'next-auth/next'

import { connectMongoDB } from '@/config/database/connection'
import User from '@/config/database/models/user'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    await connectMongoDB();
    const currentUser = await User.findOne({
      email: session.user.email,
    });

    if (!currentUser) return null;

    const { password, ...rest } = currentUser._doc
    return JSON.parse(JSON.stringify(rest));
  } catch (error) {
    return null;
  }
}
