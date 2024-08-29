import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt_token');

  if (!token) {
    return NextResponse.json({ error: 'No JWT token found in cookies' }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string);
    return NextResponse.json({ decoded });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}