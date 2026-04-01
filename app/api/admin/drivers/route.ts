import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role, DriverStatus } from "@/app/types";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentUser();

        if (!admin) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        if (admin.role !== Role.ADMIN) {
            return NextResponse.json({ error: "Access denied. Admins only." }, { status: 403 });
        }

        const searchParams = request.nextUrl.searchParams;
        const status   = searchParams.get("status");
        const city     = searchParams.get("city");
        const isActive = searchParams.get("isActive");
        // ✅ Fix 1: Single driver by ID prefix — sirf ek driver DB se aata hai
        const driverId = searchParams.get("driverId");

        // ── Single driver fetch ──────────────────────────────────────────────
        if (driverId) {
            const driver = await prisma.driverProfile.findFirst({
                where: { id: { startsWith: driverId } },
                select: {
                    id: true,
                    city: true,
                    aadhaar: true,
                    dateOfBirth: true,
                    profilePic: true,
                    aadhaarFrontPic: true,
                    aadhaarBackPic: true,
                    licensePic: true,
                    licenseNumber: true,
                    licenseExpiry: true,
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
                            createdAt: true,
                            role: true,
                        },
                    },
                },
            });

            if (!driver) {
                return NextResponse.json({ error: "Driver not found" }, { status: 404 });
            }

            return NextResponse.json({ driver });
        }

        // ── List fetch ───────────────────────────────────────────────────────
        const where: Prisma.DriverProfileWhereInput = {};

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

        if (city) {
            where.city = { contains: city, mode: "insensitive" };
        }

        if (isActive !== null && isActive !== "") {
            where.user = { isActive: isActive === "true" };
        }

        const drivers = await prisma.driverProfile.findMany({
            where,
            select: {
                id: true,
                city: true,
                aadhaar: true,
                dateOfBirth: true,
                profilePic: true,
                aadhaarFrontPic: true,
                aadhaarBackPic: true,
                licensePic: true,
                licenseNumber: true,
                licenseExpiry: true,
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
                        createdAt: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const summary = {
            total:     drivers.length,
            pending:   drivers.filter(d => d.status === DriverStatus.PENDING).length,
            approved:  drivers.filter(d => d.status === DriverStatus.APPROVED).length,
            rejected:  drivers.filter(d => d.status === DriverStatus.REJECTED).length,
            suspended: drivers.filter(d => d.status === DriverStatus.SUSPENDED).length,
        };

        return NextResponse.json({ summary, drivers });

    } catch (error) {
        console.error("Get drivers error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}