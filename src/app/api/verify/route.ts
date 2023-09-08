import dbConnect from "@/database/db";
import User, { UserDocument } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async () => {
  const cookieStore = cookies();
  try {

    const bearerToken = cookieStore.get("Authorization");

    console.log("1", bearerToken);
    if (bearerToken) {
      console.log("inside if");
      const token = bearerToken.value.split(" ")[1];
      console.log(token, process.env.secretKey!, "asssssssssssss");
      const verify = jwt.verify(token, process.env.secretKey!);
      console.log("2", verify);
      if (verify) {
        console.log("3");
        await dbConnect();
        // const existingUser = await User.findOne({  });
        const user = jwt.decode(token);
        console.log("4", user);
        if (user) {
          console.log("5");
          return NextResponse.json(
            { message: "success", user: user },
            { status: 200 }
          );
        } else {
          console.log("6");
          cookieStore.delete("Authorization");
          return NextResponse.json({ message: "fail" }, { status: 400 });
        }
      } else {
        console.log("7");
        cookieStore.delete("Authorization");
        return NextResponse.json({ message: "fail" }, { status: 400 });
      }
    } else {
      console.log("8");
      cookieStore.delete("Authorization");
      return NextResponse.json({ message: "fail" }, { status: 400 });
    }
  } catch (error) {
    console.log("9", error);
    cookieStore.delete("Authorization");
    return NextResponse.json({ message: "fail" }, { status: 400 });
  }
};
