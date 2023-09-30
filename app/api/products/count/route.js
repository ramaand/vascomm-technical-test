import { NextResponse } from 'next/server'

import { HttpStatusCode } from 'axios'

import Product from '@/config/database/models/product'
import { createResponse } from '@/config/utils/success'

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const isActive = url.searchParams.get('isActive');

    const products = await Product.countDocuments({
      isActive: isActive === null ? true : isActive,
    });

    return NextResponse.json(
      createResponse('Berhasil mengambil jumlah data produk', products)
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
