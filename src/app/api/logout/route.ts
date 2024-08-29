import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("jwt_token");
  cookies().delete("refresh_token");

  console.log("Logout successful");
  return NextResponse.json({ success: true });
}
