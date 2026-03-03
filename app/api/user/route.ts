import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { Role } from "@/app/types";

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Sirf ADMIN users list dekh sakta hai
        if (user.role !== Role.ADMIN) {
            return NextResponse.json(
                { error: "Access denied. Admins only." },
                { status: 403 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const role = searchParams.get("role");         // ?role=USER
        const isActive = searchParams.get("isActive"); // ?isActive=true

        const where: Prisma.UserWhereInput = {};

        if (role) {
            where.role = role as Role;
        }

        if (isActive !== null) {
            where.isActive = isActive === "true";
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                driverProfile: {
                    select: {
                        id: true,
                        city: true,
                        status: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ users });

    } catch (error) {
        console.error("Get users error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}