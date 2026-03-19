import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Role } from "@/app/types";
import { createClient } from "@supabase/supabase-js";

function parseBase64(base64: string): { buffer: Buffer; mimeType: string } | null {
    const match = base64.match(/^data:(.+);base64,(.+)$/);
    if (!match) return null;
    return {
        mimeType: match[1],
        buffer: Buffer.from(match[2], "base64"),
    };
}

async function uploadToSupabase(
    supabase: ReturnType<typeof createClient<any>>,
    base64: string,
    folder: string
): Promise<string | null> {
    const parsed = parseBase64(base64);
    if (!parsed) return null;

    const ext = parsed.mimeType.split("/")[1] || "jpg";
    const filename = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
        .from("driver-profiles")
        .upload(filename, parsed.buffer, { contentType: parsed.mimeType });

    if (error) throw new Error(`Upload failed (${folder}): ` + error.message);

    const { data } = supabase.storage.from("driver-profiles").getPublicUrl(filename);
    return data.publicUrl;
}

export async function PATCH(request: NextRequest) {
    try {
        const driver = await getCurrentUser();

        if (!driver) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        if (driver.role !== Role.DRIVER) {
            return NextResponse.json({ error: "Access denied. Drivers only." }, { status: 403 });
        }

        const existingProfile = await prisma.driverProfile.findUnique({
            where: { userId: driver.id },
        });

        if (!existingProfile) {
            return NextResponse.json({ error: "Driver profile not found" }, { status: 404 });
        }

        const body = await request.json();

        const {
            name,
            email,           
            phone,           
            city,            
            dob,
            profilePic,
            aadhaarFrontPic,
            aadhaarBackPic,
            licensePic,
            licenseNumber,
            licenseExpiry,
        } = body;

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Images upload
        const profilePicUrl   = profilePic      ? await uploadToSupabase(supabase, profilePic,      "profile-pics")  : undefined;
        const aadhaarFrontUrl = aadhaarFrontPic ? await uploadToSupabase(supabase, aadhaarFrontPic, "aadhaar-front") : undefined;
        const aadhaarBackUrl  = aadhaarBackPic  ? await uploadToSupabase(supabase, aadhaarBackPic,  "aadhaar-back")  : undefined;
        const licensePicUrl   = licensePic      ? await uploadToSupabase(supabase, licensePic,      "license-pics")  : undefined;

        // ✅ User table update — name, email, phone
        const userUpdateData: Record<string, unknown> = {};
        if (name)  userUpdateData.name  = name;
        if (email) userUpdateData.email = email;
        if (phone) userUpdateData.phone = phone;

        if (Object.keys(userUpdateData).length > 0) {
            await prisma.user.update({
                where: { id: driver.id },
                data: userUpdateData,
            });
        }

        // DriverProfile update
        const updateData: Record<string, unknown> = {};

        if (city)            updateData.city           = city;           // ✅ NEW
        if (dob)             updateData.dateOfBirth    = new Date(dob);
        if (profilePicUrl)   updateData.profilePic     = profilePicUrl;
        if (aadhaarFrontUrl) updateData.aadhaarFrontPic = aadhaarFrontUrl;
        if (aadhaarBackUrl)  updateData.aadhaarBackPic  = aadhaarBackUrl;
        if (licensePicUrl)   updateData.licensePic     = licensePicUrl;
        if (licenseNumber)   updateData.licenseNumber  = licenseNumber;
        if (licenseExpiry)   updateData.licenseExpiry  = new Date(licenseExpiry);

        const updated = await prisma.driverProfile.update({
            where: { userId: driver.id },
            data: updateData,
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true },
                },
            },
        });

        return NextResponse.json({
            message: "Profile updated successfully",
            driverProfile: updated,
        });

    } catch (error) {
        console.error("Driver profile update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}