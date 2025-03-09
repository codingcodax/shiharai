import { NextResponse } from 'next/server';

import { auth } from '~/server/auth';

export default auth((req) => {
  const auth = req.auth;

  if (!auth) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
});

export const config = {
  matcher: [
    '/dashboard:path*',
    '/new/:path*',
    '/notifications/:path*',
    '/settings/:path*',
    '/subscriptions/:path*',
  ],
};
