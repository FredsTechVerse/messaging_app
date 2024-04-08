"use server";

import User from "@/app/models/user";
import { revalidateTag } from "next/cache";
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
        const response = {
            status: 201,
            message: "User registered",
            payload: newUser,
        };
        return JSON.stringify(response);
    } catch (err) {
        console.log({ userRegistrationError: err })
        return handleError(err);
    }
};

export const findUserById = async (data: UserDataFetch) => {
    try {
        const { userID } = data
        const userData = await User.findById(userID)
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
        revalidateTag("user");
        const response = {
            status: 200,
            message: "User Information Updated",
            payload: savedUserData,
        };
        return JSON.stringify(response);
    } catch (error: any) {
        // ERROR HANDLING
        return handleError(error);
    }
};

export const deleteUserById = async (data: UserDataFetch) => {
    try {
        const { userID } = data
        await User.findByIdAndDelete(userID)
        const response = {
            status: 200,
            message: "User deleted ",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

