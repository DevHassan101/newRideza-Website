import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { Role, User } from "@/app/types";

const JWT_SECRET = process.env.JWT_SECRET!;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

// generateToken update karo
export const generateToken = (userId: string, role: string): string => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { userId: string } => {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;

        const decoded = verifyToken(token);

        const userFromDb = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                driverProfile: true, // driver info bhi saath aaye
            },
        });

        if (!userFromDb) return null;
        if (!userFromDb.isActive) return null; // blocked user login nahi kar sakta

        const { password, ...user } = userFromDb;
        return user as User;
    } catch (error) {
        console.error("getCurrentUser Error: ", error);
        return null;
    }
};

// Simple role check — exact role match
export const hasRole = (user: User, role: Role): boolean => {
    return user.role === role;
};

// Hierarchy check — ADMIN sabse upar
export const checkUserPermission = (user: User, requiredRole: Role): boolean => {
    const roleHierarchy = {
        [Role.USER]: 0,
        [Role.DRIVER]: 1,
        [Role.ADMIN]: 2,  // ✅ ADMIN highest
    };
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
};