import { NextResponse } from 'next/server';

function decodeToken(token) {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (e) {
    return null;
  }
}

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/admin/login', '/admin/register'];
  const isPublicPath = publicPaths.includes(path);

  // Check for token cookie
  const token = request.cookies.get('token')?.value;
  
  console.log('Middleware - Path:', path);
  console.log('Middleware - Token exists:', !!token);
  console.log('Middleware - Is public path:', isPublicPath);

  // If accessing public paths (login/register) and has valid token, redirect to dashboard
  if (isPublicPath && token) {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp * 1000 > Date.now()) {
      console.log('Middleware - Valid token on public path, redirecting to dashboard');
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      console.log('Middleware - Invalid/expired token on public path, clearing cookie');
      // Clear invalid token
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  }

  // If accessing protected paths and no token, redirect to login
  if (!isPublicPath && !token) {
    console.log('Middleware - No token on protected path, redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If accessing protected paths and token is invalid/expired, redirect to login
  if (!isPublicPath && token) {
    const decoded = decodeToken(token);
    if (!decoded || decoded.exp * 1000 < Date.now()) {
      console.log('Middleware - Invalid/expired token on protected path, redirecting to login');
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  console.log('Middleware - Allowing request to continue');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/login',
    '/admin/register', 
    '/admin/dashboard/:path*'
  ],
};
