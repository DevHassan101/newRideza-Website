import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"
import { generateToken, hashPassword } from "@/lib/auth";
import { Role } from "@/app/types";

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password } = await request.json();

        // validate required fields
        if (!name || !email || !phone || !password) {
            return NextResponse.json(
                { error: "Name, email, phone and password are required" },
                { status: 400 }
            );
        }

        // email already exists?
        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // phone already exists?
        const existingPhone = await prisma.user.findUnique({ where: { phone } });
        if (existingPhone) {
            return NextResponse.json(
                { error: "User with this phone number already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role: Role.USER, // register say sirf USER banega
            },
        });

        const token = generateToken(user.id, user.role)

        const response = NextResponse.json({
            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}