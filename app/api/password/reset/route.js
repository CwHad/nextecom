import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  try {
    const { email, password, resetCode } = body;

    // Check if user with email exists
    const user = await User.findOne({
      email: email,
      "resetCode.data": resetCode,
      "resetCode.expireAt": { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        {
          err: "Invalid or expired reset code",
        },
        {
          status: 400,
        }
      );
    }

    // Reset the user's password and save the updated user
    user.password = await bcrypt.hash(password, 10);
    user.resetCode = null;
    await user.save();

    // Send success response
    return NextResponse.json({
      message: "Password reset successfully. Login with your new password.",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again",
      },
      {
        status: 500,
      }
    );
  }
}
