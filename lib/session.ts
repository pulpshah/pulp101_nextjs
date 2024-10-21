import { cookies } from 'next/headers';
import {SignJWT, jwtVerify} from 'jose'
import { NextRequest, NextResponse } from 'next/server';
    
async function encrypt(payload: any) 
{
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    . setExpirationTime('100000 sec from now')
    .sign(new TextEncoder().encode(process.env.JWT_KEY ?? 'password'));
}

async function decrypt(input:string):  Promise<any> 
{
    const key = new TextEncoder().encode(process.env.JWT_KEY ?? 'password')
    const {payload} = await jwtVerify(input,key, {
        algorithms: ['HS256']
    });
    return payload;
}

export async function updateSession(request:NextRequest) 
{
    const session = request.cookies.get('session')?.value;
    if(!session) return;
    
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 100000 * 1000);
    const res = NextResponse.next();
    res.cookies.set(
        {
            name: 'session',
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires
        });
    return res;
}

export async function addSession(name: string, email: string) {
    const user = { name, email };
    const expires = new Date(Date.now() + 100000 * 1000);
  
    const session = await encrypt({ user, expires });
    console.log(session);
  
    const response = NextResponse.json({ status: 'success' });
    response.cookies.set({
      name: 'session',
      value: session,
      httpOnly: true,
      expires: expires,
    });
  
    return response;
}

export async function getSession() 
{
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}
      
      