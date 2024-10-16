import { NextRequest, NextResponse } from 'next/server';
import  {signIn}  from '@/auth';
 

export  async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { key,userName } = body;
 

  const loginData = {
    key: key,
    userName: userName,
  }; 

  const result = await signIn('credentials', loginData); 
  
  if (result) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
