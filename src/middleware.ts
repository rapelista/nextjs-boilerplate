import { NextResponse } from 'next/server';
import { auth } from '~/lib/auth';

/**
 * This middleware will be executed for every request that matches the config.matcher.
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export default auth((req) => {
  const currentPath = req.nextUrl.pathname;
  const signInPath = '/auth/login';
  const dashboardPath = '/dashboard';

  /**
   * Redirect to signInPath if user is tries to access '/'
   */
  if (currentPath === '/') {
    return NextResponse.redirect(new URL(signInPath, req.url));
  }

  /**
   * Protect all routes that start with the protectedPaths.
   */
  const protectedPaths = ['/dashboard'];

  if (protectedPaths.some((path) => currentPath.startsWith(path))) {
    if (!req.auth) {
      return NextResponse.redirect(new URL(signInPath, req.url));
    }
  }

  /**
   * Redirect to dashboard if user is authenticated and tries to access the signInPath.
   */
  if (currentPath === signInPath && req.auth !== null) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  return NextResponse.next();
});

/**
 * The config object is optional and can be exported as seen below.
 * It allows you to configure the middleware.
 * In this case, middleware will be executed for every request that does not match the following paths:
 * - /api/*
 * - /_next/static/*
 * - /_next/image/*
 * - /favicon.ico
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
