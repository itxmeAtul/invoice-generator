import bcrypt from "bcrypt";
import dbConnect from "@/database/db";
import User, { UserDocument } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const cookieStore = cookies();
    const bearerToken = cookieStore.get("Authorization");
    if (bearerToken) cookieStore.delete('Authorization')

    const { username, password } = await req.json();
    const existingUser = await User.findOne({ username });
    let jwtValue;
    let data;
    if (existingUser) {
      const compared = await bcrypt.compare(password, existingUser.password);
      if (compared) {
        data = {
          username: existingUser.username,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          mobileNo: existingUser.mobileNo,
          email: existingUser.email,
          password: "",
        };
        jwtValue = jwt.sign(
          {
            ...data,
          },
          process.env.secretKey!,
          {
            expiresIn: "1M",
          }
        );
        const cookieStore = cookies();
        var expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        cookieStore.set("Authorization", `Bearer ${jwtValue}`, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: expiryDate,
        });
      } else {
        return new Response("Invalid Password", { status: 401 });
      }
    } else {
      return new Response("User Not Found", { status: 400 });
    }

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all user-login", { status: 500 });
  }
};
