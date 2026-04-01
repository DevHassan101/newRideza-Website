import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Me error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// ✅ Admin profile update
export async function PATCH(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, phone, currentPassword, newPassword } = body;

        const updateData: Record<string, any> = {};

        if (name?.trim())  updateData.name  = name.trim();
        if (phone?.trim()) updateData.phone = phone.trim();

        // Email uniqueness check
        if (email?.trim() && email !== user.email) {
            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) {
                return NextResponse.json({ error: "Email already in use" }, { status: 409 });
            }
            updateData.email = email.trim();
        }

        // Password change
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json({ error: "Current password required" }, { status: 400 });
            }
            const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
            const valid  = await bcrypt.compare(currentPassword, dbUser!.password);
            if (!valid) {
                return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
            }
            if (newPassword.length < 6) {
                return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
            }
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
        }

        const updated = await prisma.user.update({
            where: { id: user.id },
            data:  updateData,
            select: { id: true, name: true, email: true, phone: true, role: true },
        });

        return NextResponse.json({ message: "Profile updated", user: updated });

    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}