import { NextResponse } from 'next/server'

import { HttpStatusCode } from 'axios'

import Product from '@/config/database/models/product'
import { verifyAdmin } from '@/config/middleware/guardRoute'
import { createResponse } from '@/config/utils/success'

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const res = await Product.findById(id);

    return NextResponse.json(createResponse('Berhasil', res));
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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        createResponse('Unauthorize', null, HttpStatusCode.Unauthorized)
      );
    }

    const isProductExist = await Product.findById(id);

    if (!isProductExist) {
      return NextResponse.json(createResponse('Produk tidak ditemukan', null));
    }

    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      }
    );

    return NextResponse.json(
      createResponse('Berhasil menghapus produk', deletedProduct)
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

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        createResponse('Unauthorize', null, HttpStatusCode.Unauthorized)
      );
    }

    const isProductExist = await Product.findById(id);

    if (!isProductExist) {
      return NextResponse.json(createResponse('Produk tidak ditemukan', null));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      createResponse('Berhasil mengubah data produk', updatedProduct)
    );
  } catch (error) {
    console.log('er', error);
    return NextResponse.json(
      createResponse(
        'Terjadi kesalahan!',
        null,
        HttpStatusCode.InternalServerError
      )
    );
  }
}
