"use server";
// import User from "@/app/models/testUser";
import User from "@/app/models/user";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/errorHandling";
import connectMongoDB from "@/lib/mongodb";
interface UserUpdateData {
    userID: string;
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
}

interface UserDataFetch {
    userID: string
}


interface UserCredentials {
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
}


export const registerUser = async ({
    firstName,
    surname,
    contact,
    amount
}: UserCredentials) => {
    try {

        const credentials = {
            firstName,
            surname,
            contact,
            amount,
        };
        await connectMongoDB();
        const newUser = await User.create(credentials);
        newUser.save();
        revalidatePath("/")
        const response = {
            status: 201,
            message: "User registered",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

export const findUserById = async (data: UserDataFetch) => {
    try {
        const { userID } = data
        await connectMongoDB();
        const userData = await User.findById(userID).populate({ path: "paymentInfo" })
        const response = {
            status: 200,
            message: "User with specified ID found",
            payload: userData,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

export const findAllUsers = async () => {
    try {
        await connectMongoDB();
        const userData = await User.find().populate({ path: "paymentInfo" })
        const response = {
            status: 200,
            message: "Users Found",
            payload: userData,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};




export const updateUserInformation = async (data: UserUpdateData) => {
    try {
        const { firstName, surname, contact, amount, userID } = data;
        await connectMongoDB();
        const updatedUserData = {
            firstName,
            surname,
            contact,
            amount
        };
        const savedUserData = await User.findByIdAndUpdate(userID, updatedUserData);
        revalidatePath("/");
        const response = {
            status: 200,
            message: "User Information Updated",
        };
        return JSON.stringify(response);
    } catch (error: any) {
        // ERROR HANDLING
        return handleError(error);
    }
};

export const deleteUserById = async (data: UserDataFetch) => {
    try {
        await connectMongoDB();
        const { userID } = data
        await User.findByIdAndDelete(userID)
        revalidatePath("/");
        const response = {
            status: 200,
            message: "User deleted ",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

