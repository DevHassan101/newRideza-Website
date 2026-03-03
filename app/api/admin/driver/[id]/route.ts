import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role } from "@/app/types";

export async function DELETE(
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

        const { id } = await params; // driverProfile.id

        // Driver profile exists?
        const driverProfile = await prisma.driverProfile.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!driverProfile) {
            return NextResponse.json(
                { error: "Driver not found" },
                { status: 404 }
            );
        }

        // User delete karo — cascade se driverProfile bhi delete hoga
        // (schema mein onDelete: Cascade hai)
        await prisma.user.delete({
            where: { id: driverProfile.userId },
        });

        return NextResponse.json({
            message: "Driver deleted successfully",
        });

    } catch (error) {
        console.error("Delete driver error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}