import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // Homepage
        if (
            request.nextUrl.pathname.startsWith("/") &&
            request.nextauth.token?.role !== "EM-203"
        ) {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        // Payments
        if (
            request.nextUrl.pathname.startsWith("/payments") &&
            request.nextauth.token?.role !== "EM-203"
        ) {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        // Messages
        if (
            request.nextUrl.pathname.startsWith("/messages") &&
            request.nextauth.token?.role !== "EM-203"
        ) {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        // Reminders
        if (
            request.nextUrl.pathname.startsWith("/reminders") &&
            request.nextauth.token?.role !== "EM-203"
        ) {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
    },
    {
        callbacks: {
            //Allows us to proceed to the callbacks if we have a token.
            authorized: ({ token }) => !!token,
        },
    }
);
export const config = {
    matcher: ["/", "/payments", "/messages", "/reminders"],
};
