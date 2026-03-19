// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { generateToken, hashPassword } from "@/lib/auth";
// import { Role } from "@/app/types";
// import { createClient } from "@supabase/supabase-js";


// export async function POST(request: NextRequest) {
//     try {
//         const supabase = createClient(
//             process.env.NEXT_PUBLIC_SUPABASE_URL!,
//             process.env.SUPABASE_SERVICE_ROLE_KEY!
//         );
//         const formData = await request.formData();
//         const name = formData.get("name") as string;
//         const email = formData.get("email") as string;
//         const phone = formData.get("phone") as string;
//         const password = formData.get("password") as string;
//         const aadhaar = formData.get("aadhaar") as string;
//         const city = formData.get("city") as string;
//         const dateOfBirth = formData.get("dateOfBirth") as string; // ✅ NEW
//         const profilePicFile = formData.get("profilePic") as File | null;

//         // Validate required fields
//         if (!name || !email || !phone || !password || !aadhaar || !city || !dateOfBirth) {
//             return NextResponse.json(
//                 { error: "Name, email, phone, password, aadhaar, city and date of birth are required" },
//                 { status: 400 }
//             );
//         }

//         // dateOfBirth valid date hai?
//         const parsedDob = new Date(dateOfBirth);
//         if (isNaN(parsedDob.getTime())) {
//             return NextResponse.json(
//                 { error: "Invalid date of birth" },
//                 { status: 400 }
//             );
//         }

//         // Email already exists?
//         const existingEmail = await prisma.user.findUnique({ where: { email } });
//         if (existingEmail) {
//             return NextResponse.json(
//                 { error: "User with this email already exists" },
//                 { status: 409 }
//             );
//         }

//         // Phone already exists?
//         const existingPhone = await prisma.user.findUnique({ where: { phone } });
//         if (existingPhone) {
//             return NextResponse.json(
//                 { error: "User with this phone number already exists" },
//                 { status: 409 }
//             );
//         }

//         // Aadhaar already exists?
//         const cleanAadhaar = aadhaar.replace(/\s/g, "");
//         const existingAadhaar = await prisma.driverProfile.findUnique({ where: { aadhaar: cleanAadhaar } });
//         if (existingAadhaar) {
//             return NextResponse.json(
//                 { error: "Driver with this Aadhaar already exists" },
//                 { status: 409 }
//             );
//         }

//         // Supabase Storage mein image upload
//         let profilePicPath: string | null = null;
//         if (profilePicFile && profilePicFile.size > 0) {
//             const bytes = await profilePicFile.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             const filename = `${Date.now()}-${profilePicFile.name.replace(/\s/g, "_")}`;

//             const { error } = await supabase.storage
//                 .from("driver-profiles")
//                 .upload(filename, buffer, {
//                     contentType: profilePicFile.type,
//                 });

//             if (error) throw new Error("Image upload failed: " + error.message);

//             const { data: urlData } = supabase.storage
//                 .from("driver-profiles")
//                 .getPublicUrl(filename);

//             profilePicPath = urlData.publicUrl;
//         }

//         const hashedPassword = await hashPassword(password);

//         // Transaction
//         const result = await prisma.$transaction(async (tx) => {
//             const user = await tx.user.create({
//                 data: {
//                     name,
//                     email,
//                     phone,
//                     password: hashedPassword,
//                     role: Role.DRIVER,
//                 },
//             });

//             const driverProfile = await tx.driverProfile.create({
//                 data: {
//                     userId: user.id,
//                     aadhaar: cleanAadhaar,
//                     city,
//                     dateOfBirth: parsedDob, // ✅ NEW
//                     profilePic: profilePicPath,
//                 },
//             });

//             return { user, driverProfile };
//         });

//         const token = generateToken(result.user.id, result.user.role);

//         const response = NextResponse.json({
//             message: "Driver registration successful. Pending admin approval.",
//             user: {
//                 id: result.user.id,
//                 name: result.user.name,
//                 email: result.user.email,
//                 phone: result.user.phone,
//                 role: result.user.role,
//                 driverProfile: {
//                     id: result.driverProfile.id,
//                     city: result.driverProfile.city,
//                     dateOfBirth: result.driverProfile.dateOfBirth, // ✅ NEW
//                     status: result.driverProfile.status,
//                 },
//             },
//         }, { status: 201 });

//         response.cookies.set("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "lax",
//             maxAge: 60 * 60 * 24 * 7,
//         });

//         return response;

//     } catch (error) {
//         console.error("Driver registration error:", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateToken, hashPassword } from "@/lib/auth";
import { Role } from "@/app/types";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const password = formData.get("password") as string;
        const aadhaar = formData.get("aadhaar") as string;
        const city = formData.get("city") as string;

        // ✅ CHANGE 1: dateOfBirth ab optional hai — string | null
        const dateOfBirth = formData.get("dateOfBirth") as string | null;

        const profilePicFile = formData.get("profilePic") as File | null;

        // ✅ CHANGE 2: dateOfBirth ko required check se hata diya
        if (!name || !email || !phone || !password || !aadhaar || !city) {
            return NextResponse.json(
                { error: "Name, email, phone, password, aadhaar and city are required" },
                { status: 400 }
            );
        }

        // ✅ CHANGE 3: DOB sirf tab parse hoga jab form se aaya ho, warna null
        const parsedDob = dateOfBirth ? new Date(dateOfBirth) : null;

        // ✅ CHANGE 4: Validation bhi sirf tab hogi jab dateOfBirth diya ho
        if (dateOfBirth && parsedDob && isNaN(parsedDob.getTime())) {
            return NextResponse.json(
                { error: "Invalid date of birth" },
                { status: 400 }
            );
        }

        // Email already exists?
        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Phone already exists?
        const existingPhone = await prisma.user.findUnique({ where: { phone } });
        if (existingPhone) {
            return NextResponse.json(
                { error: "User with this phone number already exists" },
                { status: 409 }
            );
        }

        // Aadhaar already exists?
        const cleanAadhaar = aadhaar.replace(/\s/g, "");
        const existingAadhaar = await prisma.driverProfile.findUnique({ where: { aadhaar: cleanAadhaar } });
        if (existingAadhaar) {
            return NextResponse.json(
                { error: "Driver with this Aadhaar already exists" },
                { status: 409 }
            );
        }

        // Supabase Storage mein image upload
        let profilePicPath: string | null = null;
        if (profilePicFile && profilePicFile.size > 0) {
            const bytes = await profilePicFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${profilePicFile.name.replace(/\s/g, "_")}`;

            const { error } = await supabase.storage
                .from("driver-profiles")
                .upload(filename, buffer, {
                    contentType: profilePicFile.type,
                });

            if (error) throw new Error("Image upload failed: " + error.message);

            const { data: urlData } = supabase.storage
                .from("driver-profiles")
                .getPublicUrl(filename);

            profilePicPath = urlData.publicUrl;
        }

        const hashedPassword = await hashPassword(password);

        // Transaction
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                    role: Role.DRIVER,
                },
            });

            const driverProfile = await tx.driverProfile.create({
                data: {
                    userId: user.id,
                    aadhaar: cleanAadhaar,
                    city,
                    // ✅ CHANGE 5: parsedDob ab null ho sakta hai — DB mein NULL store hoga
                    // Baad mein PATCH /api/driver/profile se update hoga jab step 2 banao
                    dateOfBirth: parsedDob,
                    profilePic: profilePicPath,
                },
            });

            return { user, driverProfile };
        });

        const token = generateToken(result.user.id, result.user.role);

        const response = NextResponse.json({
            message: "Driver registration successful. Pending admin approval.",
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                phone: result.user.phone,
                role: result.user.role,
                driverProfile: {
                    id: result.driverProfile.id,
                    city: result.driverProfile.city,
                    dateOfBirth: result.driverProfile.dateOfBirth,
                    status: result.driverProfile.status,
                },
            },
        }, { status: 201 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Driver registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}