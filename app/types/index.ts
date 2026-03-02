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
    driverProfile?: DriverProfile | null;
}