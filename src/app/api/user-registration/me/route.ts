import dbConnect from "@/database/db";
import User, { UserDocument } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async () => {
  try {
    const cookieStore = cookies();
    const bearerToken = cookieStore.get("Authorization");

    if (bearerToken) {
      const token = bearerToken.value.split(" ")[1];
      const verify = jwt.verify(token, process.env.secretKey!);
      if (verify) {
        await dbConnect();
        // const existingUser = await User.findOne({  });
        const user = jwt.decode(token);
        if (user) {
          return NextResponse.json(
            { message: "success", user: user },
            { status: 200 }
          );
        } else {
          cookieStore.delete("Authorization");
          return NextResponse.json({ message: "fail" }, { status: 400 });
        }
      } else {
        cookieStore.delete("Authorization");
        return NextResponse.json({ message: "fail" }, { status: 400 });
      }
    } else {
      cookieStore.delete("Authorization");
      return NextResponse.json({ message: "fail" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "fail" }, { status: 400 });
  }
};
