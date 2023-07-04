import User from "@models/user";
import { connectToDB } from "@utils/database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, username, password } = await req.json();
  try {
    await connectToDB();
    const existingUser = await User.findOne({
      email,
    });
    console.log(existingUser);
    if (existingUser) {
      if (existingUser.password) {
        return NextResponse.json({
          success: true,
          message: "Account already exists with this email. Please, sign in.",
        });
      } else {
        existingUser.password = await hash(password, 12);
        await existingUser.save();
        return NextResponse.json({
          success: true,
          message: "Password has been updated",
        });
      }
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({
        success: false,
        message: "Username already exists. Try a different one.",
      });
    }
    const user = await User.create({
      email,
      username,
      password: await hash(password, 12),
    });
    return NextResponse.json({
      success: true,
      message: "Account has been created successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create a new user",
      error,
    });
  }
};
