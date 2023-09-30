import { NextRequest, NextResponse } from 'next/server'

import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

import { connectMongoDB } from '@/config/database/connection'
import User from '@/config/database/models/user'
import { userSchema } from '@/config/database/schemas/user.schema'
import { validateMiddleware } from '@/config/middleware/validateSchema'
import { generatedRandomPassword } from '@/lib/utils'

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, phone } = body;
    
    const password = generatedRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 12);
    await validateMiddleware(req, {...body, password}, userSchema.create);

    await connectMongoDB();

    const isExist = await User.findOne({ email }).select('_id');

    if (isExist) {
      return NextResponse.json({
        code: HttpStatusCode.BadRequest,
        message: 'Email sudah terdaftar',
        data: null,
      });
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

    return NextResponse.json({
      code: HttpStatusCode.Ok,
      message:
        'Registrasi berhasil, silahkan check email untuk mendapatkan password',
      data: res,
    });
  } catch (error) {
    console.log('error register', error);
    return NextResponse.json({
      code: HttpStatusCode.InternalServerError,
      message: 'Terjadi kesalahan saat registrasi',
      data: null,
    });
  }
}

export async function sendPasswordEmail(subject, toEmail, otpText) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL, // Your email address
      pass: process.env.NODEMAILER_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

