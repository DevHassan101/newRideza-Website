// import { getCurrentUser } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";
// import prisma from "@/lib/db";
// import { Role } from "@/app/types";

// export async function GET(request: NextRequest) {
//     try {
//         const user = await getCurrentUser();

//         if (!user) {
//             return NextResponse.json(
//                 { error: "Not authenticated" },
//                 { status: 401 }
//             );
//         }

//         // Sirf ADMIN users list dekh sakta hai
//         if (user.role !== Role.ADMIN) {
//             return NextResponse.json(
//                 { error: "Access denied. Admins only." },
//                 { status: 403 }
//             );
//         }

//         const searchParams = request.nextUrl.searchParams;
//         const role = searchParams.get("role");         // ?role=USER
//         const isActive = searchParams.get("isActive"); // ?isActive=true

//         const where: Prisma.UserWhereInput = {};

//         if (role) {
//             where.role = role as Role;
//         }

//         if (isActive !== null) {
//             where.isActive = isActive === "true";
//         }

//         const users = await prisma.user.findMany({
//             where,
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 phone: true,
//                 role: true,
//                 isActive: true,
//                 createdAt: true,
//                 driverProfile: {
//                     select: {
//                         id: true,
//                         city: true,
//                         status: true,
//                     },
//                 },
//             },
//             orderBy: { createdAt: "desc" },
//         });

//         return NextResponse.json({ users });

//     } catch (error) {
//         console.error("Get users error:", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }

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
        const role        = searchParams.get("role");       // ?role=USER
        const isActive    = searchParams.get("isActive");   // ?isActive=false
        const search      = searchParams.get("search");     // ?search=ali
        const page        = parseInt(searchParams.get("page") ?? "1");
        const limit       = parseInt(searchParams.get("limit") ?? "20");
        const skip        = (page - 1) * limit;

        const where: Prisma.UserWhereInput = {};

        // Role filter
        if (role) {
            where.role = role as Role;
        }

        // Active/banned filter
        if (isActive !== null) {
            where.isActive = isActive === "true";
        }

        // Search — name, email, ya phone se
        if (search && search.trim() !== "") {
            where.OR = [
                { name:  { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
            ];
        }

        // Total count (pagination ke liye)
        const total = await prisma.user.count({ where });

        const users = await prisma.user.findMany({
            where,
            select: {
                id:        true,
                name:      true,
                email:     true,
                phone:     true,
                role:      true,
                isActive:  true,
                createdAt: true,
                // Ban fields
                bannedAt:  true,
                bannedBy:  true,
                banReason: true,
                banNote:   true,
                // Driver profile (agar driver hai)
                driverProfile: {
                    select: {
                        id:     true,
                        city:   true,
                        status: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });

        return NextResponse.json({
            users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        });

    } catch (error) {
        console.error("Get users error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}