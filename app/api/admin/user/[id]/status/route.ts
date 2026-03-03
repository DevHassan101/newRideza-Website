import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role } from "@/app/types";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentUser();

        // Auth check
        if (!admin) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Admin only
        if (admin.role !== Role.ADMIN) {
            return NextResponse.json(
                { error: "Access denied. Admins only." },
                { status: 403 }
            );
        }

        const { id } = await params; // user id
        const { isActive } = await request.json();

        // isActive must be boolean
        if (typeof isActive !== "boolean") {
            return NextResponse.json(
                { error: "isActive must be true or false" },
                { status: 400 }
            );
        }

        // Admin apne aap ko block nahi kar sakta
        if (id === admin.id) {
            return NextResponse.json(
                { error: "You cannot change your own status" },
                { status: 400 }
            );
        }

        // User exists?
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Doosray admin ko block nahi kar sakta
        if (existingUser.role === Role.ADMIN) {
            return NextResponse.json(
                { error: "Cannot change status of another admin" },
                { status: 403 }
            );
        }

        const updated = await prisma.user.update({
            where: { id },
            data: { isActive },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
            },
        });

        return NextResponse.json({
            message: `User ${isActive ? "unblocked" : "blocked"} successfully`,
            user: updated,
        });

    } catch (error) {
        console.error("User status update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}