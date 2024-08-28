import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const response = await fetch(process.env.KEYCLOAK_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        grant_type: "password",
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      cookies().set("jwt_token", data.access_token, {
        maxAge: 3600,
        httpOnly: true,
      });
      cookies().set("refresh_token", data.refresh_token, {
        maxAge: 24 * 3600,
        httpOnly: true,
      });

      console.log("Access token:", data.access_token);

      const decodedToken = jwtDecode(data.access_token);
      console.log("Decoded token:", decodedToken);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}