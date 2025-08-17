import { headers } from 'next/headers';
import { type NextRequest, NextResponse, userAgent } from 'next/server';

import { auth } from '~/server/auth';

export const middleware = async (req: NextRequest) => {
	const { pathname } = req.nextUrl;
	const { device } = userAgent(req);
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (device.type !== 'mobile') {
		return NextResponse.rewrite(new URL('/unsupported-device', req.url));
	}

	if (!session) {
		if (authPages.includes(pathname)) {
			return NextResponse.next();
		}

		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (session && authPages.includes(pathname)) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	return NextResponse.next();
};

export const config = {
	runtime: 'nodejs',
	matcher: ['/login/:path*', '/dashboard/:path*'],
};

const authPages = ['/login'];
