import { NextResponse } from 'next/server'

import { HttpStatusCode } from 'axios'

import Product from '@/config/database/models/product'
import User from '@/config/database/models/user'
import { createResponse } from '@/config/utils/success'

export async function GET(req) {
  try {
    const products =  await Product.countDocuments()
    const productActives = await Product.countDocuments({ isActive: true });
    const productNonActives = await Product.countDocuments({ isActive: false });

    const users =  await User.countDocuments()
    const userActives = await User.countDocuments({ isActive: true });
    const userNonActives = await User.countDocuments({ isActive: false });

    return NextResponse.json(
      createResponse('Berhasil mengambil total data', {
        product: { active: productActives, nonActive: productNonActives, total: products },
        user: { active: userActives, nonActive: userNonActives, total: users },
      })
    );
  } catch (error) {
    return NextResponse.json(
      createResponse(
        'Terjadi kesalahan!',
        null,
        HttpStatusCode.InternalServerError
      )
    );
  }
}
