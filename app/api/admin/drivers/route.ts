import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role, DriverStatus } from "@/app/types";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
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

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get("status");   // ?status=PENDING
        const city = searchParams.get("city");       // ?city=Karachi
        const isActive = searchParams.get("isActive"); // ?isActive=false

        const where: Prisma.DriverProfileWhereInput = {};

        // Filter by driver status
        if (status) {
            const validStatuses = Object.values(DriverStatus);
            if (!validStatuses.includes(status as DriverStatus)) {
                return NextResponse.json(
                    { error: `Status must be one of: ${validStatuses.join(", ")}` },
                    { status: 400 }
                );
            }
            where.status = status as DriverStatus;
        }

        // Filter by city
        if (city) {
            where.city = { contains: city, mode: "insensitive" };
        }

        // Filter by user isActive
        if (isActive !== null) {
            where.user = { isActive: isActive === "true" };
        }

        const drivers = await prisma.driverProfile.findMany({
            where,
            select: {
                id: true,
                city: true,
                aadhaar: true,
                profilePic: true,
                status: true,
                reviewedBy: true,
                reviewedAt: true,
                reviewNote: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        isActive: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Count by status for summary
        const summary = {
            total: drivers.length,
            pending: drivers.filter(d => d.status === DriverStatus.PENDING).length,
            approved: drivers.filter(d => d.status === DriverStatus.APPROVED).length,
            rejected: drivers.filter(d => d.status === DriverStatus.REJECTED).length,
            suspended: drivers.filter(d => d.status === DriverStatus.SUSPENDED).length,
        };

        return NextResponse.json({ summary, drivers });

    } catch (error) {
        console.error("Get drivers error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}