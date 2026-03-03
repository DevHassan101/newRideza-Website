// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { getCurrentUser } from "@/lib/auth";
// import { Role } from "@/app/types";

// export async function PATCH(
//     request: NextRequest,
//     { params }: { params: Promise<{ id: string }> }
// ) {
//     try {
//         const admin = await getCurrentUser();

//         // Auth check
//         if (!admin) {
//             return NextResponse.json(
//                 { error: "Not authenticated" },
//                 { status: 401 }
//             );
//         }

//         // Admin only
//         if (admin.role !== Role.ADMIN) {
//             return NextResponse.json(
//                 { error: "Access denied. Admins only." },
//                 { status: 403 }
//             );
//         }

//         const { id } = await params; // user id
//         const { isActive } = await request.json();

//         // isActive must be boolean
//         if (typeof isActive !== "boolean") {
//             return NextResponse.json(
//                 { error: "isActive must be true or false" },
//                 { status: 400 }
//             );
//         }

//         // Admin apne aap ko block nahi kar sakta
//         if (id === admin.id) {
//             return NextResponse.json(
//                 { error: "You cannot change your own status" },
//                 { status: 400 }
//             );
//         }

//         // User exists?
//         const existingUser = await prisma.user.findUnique({ where: { id } });
//         if (!existingUser) {
//             return NextResponse.json(
//                 { error: "User not found" },
//                 { status: 404 }
//             );
//         }

//         // Doosray admin ko block nahi kar sakta
//         if (existingUser.role === Role.ADMIN) {
//             return NextResponse.json(
//                 { error: "Cannot change status of another admin" },
//                 { status: 403 }
//             );
//         }

//         const updated = await prisma.user.update({
//             where: { id },
//             data: { isActive },
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 phone: true,
//                 role: true,
//                 isActive: true,
//             },
//         });

//         return NextResponse.json({
//             message: `User ${isActive ? "unblocked" : "blocked"} successfully`,
//             user: updated,
//         });

//     } catch (error) {
//         console.error("User status update error:", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role, BanReason } from "@/app/types";

export async function PATCH(
    request: NextRequest,
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
        const body = await request.json();
        const { isActive, banReason, banNote } = body;

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

        // Ban karte waqt reason zaroori hai
        if (!isActive && !banReason) {
            return NextResponse.json(
                { error: "banReason is required when banning a user" },
                { status: 400 }
            );
        }

        // Ban reason valid enum value hai?
        if (banReason && !Object.values(BanReason).includes(banReason)) {
            return NextResponse.json(
                { error: "Invalid banReason value" },
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

        // Ban kar raha hai — ban fields save karo
        // Unban kar raha hai — ban fields clear karo
        const updateData = isActive
            ? {
                isActive:  true,
                bannedAt:  null,
                bannedBy:  null,
                banReason: null,
                banNote:   null,
              }
            : {
                isActive:  false,
                bannedAt:  new Date(),
                bannedBy:  admin.id,
                banReason: banReason as BanReason,
                banNote:   banNote ?? null,
              };

        const updated = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id:        true,
                name:      true,
                email:     true,
                phone:     true,
                role:      true,
                isActive:  true,
                bannedAt:  true,
                bannedBy:  true,
                banReason: true,
                banNote:   true,
            },
        });

        return NextResponse.json({
            message: `User ${isActive ? "unblocked" : "banned"} successfully`,
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