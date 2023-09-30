import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import { HttpStatusCode } from 'axios'

export const verifyAdmin = async (req) => {
  const currentUser = await getCurrentUser();

  // if (!currentUser || currentUser.role !== 'admin') {
  if (!currentUser) {
    return false
  }

  return true
}