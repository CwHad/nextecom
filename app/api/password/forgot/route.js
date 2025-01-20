import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import randomInteger from "random-int";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_AUTH_USER,
    pass: process.env.GMAIL_AUTH_PASS,
  },
});

export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  const { email } = body;

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ err: "User not found" }, { status: 400 });
  }

  const resetCode = randomInteger(100000, 999999);

  user.resetCode = {
    data: resetCode,
    expireAt: new Date(Date.now() + 10 * 60 * 1000),
  };

  await user.save();

  // send email
  const mailOptions = {
    to: email,
    from: process.env.GMAIL_AUTH_USER,
    subject: "Password Reset Code",
    html: `
        Hi, ${user.name}, <br />
        <br />
        You have requested a password reset. Please use the following code to reset your password: <br />
        <br />
        <strong>${resetCode}</strong><br />
        <br />
        If you did not request a password reset, Please ignore this email. <br />
        <br />
        Thanks, <br />
        The Proferlo Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "Check your email for password reset code",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Error sending email",
      },
      { status: 500 }
    );
  }
}
