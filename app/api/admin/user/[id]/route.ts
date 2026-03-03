import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role } from "@/app/types";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentUser();

        if (!admin) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        if (admin.role !== Role.ADMIN) {
            return NextResponse.json(
                { error: "Access denied. Admins only." },
                { status: 403 }
            );
        }

        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id:        true,
                name:      true,
                email:     true,
                phone:     true,
                role:      true,
                isActive:  true,
                createdAt: true,
                updatedAt: true,
                // Ban info
                bannedAt:  true,
                bannedBy:  true,
                banReason: true,
                banNote:   true,
                // Driver profile agar hai
                driverProfile: {
                    select: {
                        id:         true,
                        city:       true,
                        status:     true,
                        aadhaar:    true,
                        profilePic: true,
                        reviewNote: true,
                        reviewedAt: true,
                        createdAt:  true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Ban karne wale admin ka naam bhi return karo (agar banned hai)
        let bannedByAdmin = null;
        if (user.bannedBy) {
            bannedByAdmin = await prisma.user.findUnique({
                where: { id: user.bannedBy },
                select: { id: true, name: true, email: true },
            });
        }

        return NextResponse.json({
            user: {
                ...user,
                bannedByAdmin,
            },
        });

    } catch (error) {
        console.error("Get user detail error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentUser();

        if (!admin) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        if (admin.role !== Role.ADMIN) return NextResponse.json({ error: "Access denied" }, { status: 403 });

        const { id } = await params;

        if (id === admin.id) return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });

        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
        if (existingUser.role === Role.ADMIN) return NextResponse.json({ error: "Cannot delete another admin" }, { status: 403 });

        await prisma.user.delete({ where: { id } });

        return NextResponse.json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}