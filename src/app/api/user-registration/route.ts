import bcrypt from "bcrypt";
import dbConnect from "../../database/db";
import User, { UserDocument } from "../../models/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    return new Response("user-registration-api", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const { username, password } = await req.json();

    // Check if the username already exists
    await dbConnect();

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return new Response(
        JSON.stringify(`{ message: "Username already exists" }`),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: UserDocument = new User({
      username,
      password: hashedPassword,
    });

    try {
      await newUser.save();
      return new Response(
        JSON.stringify(`{ message: "User registered successfully"  }`),
        { status: 201 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify(`{ message:  "Registration failed"   }`),
        { status: 500 }
      );
    }
  } else {
    return new Response(`Something went wrong`, { status: 406 });
  }
};
