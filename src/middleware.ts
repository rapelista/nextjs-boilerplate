import { NextResponse } from 'next/server';
import { auth } from '~/lib/auth';

/**
 * This middleware will be executed for every request that matches the config.matcher.
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export default auth((req) => {
  /**
   * This is the request object. You can read the request body, headers, etc.
   */
  req;

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
