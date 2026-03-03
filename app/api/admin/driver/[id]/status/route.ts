import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role, DriverStatus } from "@/app/types";

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

        const { id } = await params; // driver profile id
        const { status, reviewNote } = await request.json();

        // Valid status check
        const validStatuses = [
            DriverStatus.APPROVED,
            DriverStatus.REJECTED,
            DriverStatus.SUSPENDED,
            DriverStatus.PENDING,
        ];

        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Status must be one of: ${validStatuses.join(", ")}` },
                { status: 400 }
            );
        }

        // Driver profile exists?
        const driverProfile = await prisma.driverProfile.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!driverProfile) {
            return NextResponse.json(
                { error: "Driver profile not found" },
                { status: 404 }
            );
        }

        // Update status
        const updated = await prisma.driverProfile.update({
            where: { id },
            data: {
                status,
                reviewedBy: admin.id,
                reviewedAt: new Date(),
                reviewNote: reviewNote ?? null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        role: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: `Driver status updated to ${status}`,
            driverProfile: updated,
        });

    } catch (error) {
        console.error("Driver status update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}