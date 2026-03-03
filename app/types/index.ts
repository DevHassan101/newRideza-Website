export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    DRIVER = "DRIVER",
}

export enum DriverStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    SUSPENDED = "SUSPENDED",
}

export enum BanReason {
    FAKE_BOOKING = "FAKE_BOOKING",
    REPEATED_CANCELS = "REPEATED_CANCELS",
    HARASSMENT = "HARASSMENT",
    FRAUD = "FRAUD",
    FAKE_ACCOUNT = "FAKE_ACCOUNT",
    OTHER = "OTHER",
}

export interface DriverProfile {
    id: string;
    userId: string;
    aadhaar: string;
    city: string;
    profilePic?: string | null;
    status: DriverStatus;
    reviewedBy?: string | null;
    reviewedAt?: Date | null;
    reviewNote?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    bannedAt: Date | null;
    bannedBy: string | null;
    banReason: BanReason | null;
    banNote: string | null;
    driverProfile?: DriverProfile | null;
}