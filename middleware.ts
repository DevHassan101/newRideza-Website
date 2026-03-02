import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const publicRoutes = ["/login", "/register", "/driver/register"];

const roleRoutes: Record<string, string> = {
    ADMIN: "/admin",
    USER: "/user",
    DRIVER: "/driver",
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = publicRoutes.some((r) => pathname.startsWith(r));
    const token = request.cookies.get("token")?.value;

    // Token nahi — public allow, protected ko login par bhejo
    if (!token) {
        if (isPublic) return NextResponse.next();
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Token verify karo — jose use karo (edge compatible)
    let role: string;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        role = payload.role as string;
    } catch {
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("token");
        return res;
    }

    // Logged in hai aur public route par — dashboard par bhejo
    if (isPublic) {
        const redirect = roleRoutes[role] ?? "/login";
        return NextResponse.redirect(new URL(redirect, request.url));
    }

    // Wrong role — apne dashboard par bhejo
    const allowedBase = roleRoutes[role];
    if (allowedBase && !pathname.startsWith(allowedBase)) {
        return NextResponse.redirect(new URL(allowedBase, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/user/:path*",
        "/driver/:path*",
        "/login",
        "/register",
        "/driver/register",
    ],
};