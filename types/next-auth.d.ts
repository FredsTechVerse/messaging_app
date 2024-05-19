import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
            id: string;
            name: string;
            idNo: string;
            isContactVerified: boolean;
        } & DefaultSession;
    }

    interface User extends DefaultUser {
        _id: string;
        fName: string;
        surName: string;
        idNo: string;
        password: string;
        isContactVerified: boolean;
        contactVerificationCode: string;
        resetToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: string;
        name: string;
        idNo: string;
        isContactVerified: boolean;
    }
}
