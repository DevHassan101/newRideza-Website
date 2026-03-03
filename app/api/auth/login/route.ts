import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const userFromDb = await prisma.user.findUnique({
            where: { email },
            include: { driverProfile: true }, // ✅ naya schema
        });

        if (!userFromDb) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // blocked user login nahi kar sakta
        if (!userFromDb.isActive) {
            return NextResponse.json(
                { error: "Your account has been suspended. Contact support." },
                { status: 403 }
            );
        }

        const isValidPassword = await verifyPassword(password, userFromDb.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Driver ka status check — PENDING/REJECTED login na kar sakay
        if (userFromDb.role === "DRIVER" && userFromDb.driverProfile) {
            const status = userFromDb.driverProfile.status;
            if (status === "PENDING") {
                return NextResponse.json(
                    { error: "Your driver account is pending admin approval" },
                    { status: 403 }
                );
            }
            if (status === "REJECTED") {
                return NextResponse.json(
                    { error: "Your driver application has been rejected" },
                    { status: 403 }
                );
            }
            if (status === "SUSPENDED") {
                return NextResponse.json(
                    { error: "Your driver account has been suspended" },
                    { status: 403 }
                );
            }
        }

        const token = generateToken(userFromDb.id, userFromDb.role);

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: userFromDb.id,
                name: userFromDb.name,
                email: userFromDb.email,
                phone: userFromDb.phone,
                role: userFromDb.role,
                driverProfile: userFromDb.driverProfile ?? null,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}