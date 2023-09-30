import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'

import { connectMongoDB } from '@/config/database/connection'
import User from '@/config/database/models/user'
import { userSchema } from '@/config/database/schemas/user'
import { verifyAdmin } from '@/config/middleware/guardRoute'
import { validateMiddleware } from '@/config/middleware/validateSchema'
import { createResponse } from '@/config/utils/success'
import { generatedRandomPassword } from '@/lib/utils'

import { sendPasswordEmail } from '../register/route'

export async function GET() {
  try {
    const res = await User.find({ isDeleted: { $ne: true } });

    return NextResponse.json(
      createResponse('Berhasil mengambil daftar user', res)
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
    const password = generatedRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 12);

    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return NextResponse.json(
        createResponse('Unauthorize', null, HttpStatusCode.Unauthorized)
      );
    }

    const body = await req.json();
    const { email, name, phone } = body;

    await validateMiddleware(req, { ...body, password }, userSchema.create);

    const isExist = await User.findOne({ email }).select('_id');

    if (isExist) {
      return NextResponse.json(
        createResponse('Email sudah terdaftar', null, HttpStatusCode.BadRequest)
      );
    }

    const res = await User.create({
      email,
      name,
      phone,
      password: hashedPassword,
    });

    await sendPasswordEmail(
      'Your New Account Password',
      email,
      `Your new password is: ${password}`
    );

    return NextResponse.json(createResponse('Data user berhasil disimpan'));
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
