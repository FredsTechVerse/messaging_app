import { z } from "zod"
export const UserSchema = z.object({
    fName: z
        .string()
        .min(1, "First name is required")
        .max(12, "Cannot exceed 12 characters"),
    surname: z
        .string()
        .min(1, "Last Name is required")
        .max(12, "Cannot exceed 12 characters"),
    amount: z.number().positive().gte(1),
    contact: z
        .string()
        .length(9, "Contact must contain nine digits")

});

export const AdminSchema = z.object({
    fName: z
        .string()
        .min(1, "First name required")
        .max(12, "Cannot exceed 12 characters"),
    surname: z
        .string()
        .min(1, "Last Name required")
        .max(12, "Cannot exceed 12 characters"),
    contact: z
        .string()
        .length(9, "Contact must contain nine digits"),
    idNo: z
        .string()
        .min(1, "ID Number  required"),

});
export const SigninSchema = z.object({
    username: z
        .string()
        .min(1, "Username  required"),
    password: z.string().min(1, "Password required"),
});
export const ResetTokenSchema = z.object({
    resetToken: z
        .string()
        .min(1, "Reset Token required"),
});

export const ForgotPasswordSchema = z.object({
    idNo: z
        .string()
        .min(1, "ID Number required"),
    role: z.string().min(1, "Role required"),
});

export const PasswordUpdateSchema = z.object({
    password: z
        .string()
        .min(1, "ID Number required"),
    cPassword: z.string().min(1, "Password confirmation required"),
});

export const AccountConfirmationSchema = z.object({
    contactVerification: z
        .string()
        .min(1, "Contact verification code required"),
});


export const PaymentSchema = z.object({
    referenceID: z.string().length(10, "Should not exceed 10 characters")
        .optional().or(z.literal('')),
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(12, "Cannot exceed 12 characters"),
    surname: z
        .string()
        .min(1, "Last Name is required")
        .max(12, "Cannot exceed 12 characters"),
    date: z.date(),
    modeOfPayment: z.string().min(1, "Mode of payment required"),
    amount: z.number().positive().gte(1),
    contact: z
        .string()
        .length(9, "Contact must contain nine digits")

});


export const MessageSchema = z.object({
    message: z.string().min(1, "Message is required."),
});

