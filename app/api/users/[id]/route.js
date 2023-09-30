import { NextResponse } from 'next/server'

import { HttpStatusCode } from 'axios'

import User from '@/config/database/models/user'
import { verifyAdmin } from '@/config/middleware/guardRoute'
import { createResponse } from '@/config/utils/success'

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const res = await User.findById(id);

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

    const isUserExist = await User.findById(id);

    if (!isUserExist) {
      return NextResponse.json(createResponse('User tidak ditemukan', null));
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      {
        new: true,
      }
    );

    return NextResponse.json(
      createResponse('Berhasil menghapus user', deletedUser)
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

    const isUserExist = await User.findById(id);

    if (!isUserExist) {
      return NextResponse.json(createResponse('User tidak ditemukan', null));
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(
      createResponse('Berhasil mengubah data user', updatedUser)
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
