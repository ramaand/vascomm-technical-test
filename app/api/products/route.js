import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import { HttpStatusCode } from 'axios'

import { connectMongoDB } from '@/config/database/connection'
import Product from '@/config/database/models/product'
import { productSchema } from '@/config/database/schemas/product'
import { verifyAdmin } from '@/config/middleware/guardRoute'
import { validateMiddleware } from '@/config/middleware/validateSchema'
import { createResponse } from '@/config/utils/success'

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const skipCount = url.searchParams.get('skip');
    const takeCount = url.searchParams.get('take');

    await connectMongoDB();
    let res = await Product.find({ isDeleted: { $ne: true } });
    if (skipCount || takeCount) {
      res = await Product.find({ isDeleted: { $ne: true } })
        .skip(parseInt(skipCount))
        .limit(parseInt(takeCount));
    }

    return NextResponse.json(
      createResponse('Berhasil mengambil daftar produk', res)
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

export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        createResponse('Unauthorize', null, HttpStatusCode.Unauthorized)
      );
    }

    const body = await req.json();

    await validateMiddleware(req, body, productSchema.create);

    const res = await Product.create(body);

    return NextResponse.json(createResponse('Data produk berhasil disimpan'));
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      createResponse(
        'Terjadi kesalahan!',
        null,
        HttpStatusCode.InternalServerError
      )
    );
  }
}
