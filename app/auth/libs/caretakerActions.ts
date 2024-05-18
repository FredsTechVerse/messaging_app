"use server";
import Caretaker from "@/app/auth/models/caretaker";
import bcrypt from "bcryptjs";
import { generateRandomString } from "@/app/auth/libs/authentication";
import { sendUserMessage } from "@/lib/messageActions";
import { handleError } from "@/lib/errorHandling";
import connectMongoDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

interface CaretakerCredentials {
  fName: string;
  surname: string;
  idNo: string;
  contact: string;
}

interface CaretakerCredentialsUpdate {
  userID: string;
  fName: string;
  surname: string;
  idNo: string;
  contact: string;
}

interface CaretakerCredentialsConfirmation {
  userID: string;
  contactVerificationCode: string;
}

interface CaretakerPasswordUpdate {
  userID: string;
  password: string;
}

interface ResetTokenConfirmation {
  userID: string;
  resetToken: string;
}

interface CaretakerDataFetch {
  userID: string
}

const registerCaretaker = async ({
  fName,
  surname,
  idNo,
  contact,
}: CaretakerCredentials) => {
  try {
    await connectMongoDB()
    const extractedContact = contact.substring(3);
    const hashedPassword = bcrypt.hashSync(`0${extractedContact}`, 10);
    const contactVerificationCode = await generateRandomString(6);
    const message = `Hello ${fName.toUpperCase()},${contactVerificationCode} is your contact verification code for your caretaker account.`;
    revalidatePath("/")
    const credentials = {
      fName: fName,
      surname: surname,
      idNo,
      contact: contact,
      contactVerificationCode,
      password: hashedPassword,
    };

    // Generate reset token to be sent to idNo and as sms
    const newCaretaker = await Caretaker.create(credentials);
    newCaretaker.save();

    sendUserMessage({
      recipients: [`+${contact}`],
      message: message,
    });

    const response = {
      status: 201,
      message: "Caretaker registered",
      payload: newCaretaker

    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

const updateCaretakerInfo = async ({
  userID,
  fName,
  surname,
  idNo,
  contact,
}: CaretakerCredentialsUpdate) => {
  try {
    await connectMongoDB();

    const credentials = {
      fName: fName,
      surname: surname,
      idNo: idNo,
      contact: contact,
    };
    await Caretaker.findByIdAndUpdate(userID, credentials);
    revalidatePath("/")
    const response = {
      status: 200,
      message: "Caretaker information updated",
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

export const updateCaretakerPasswords = async () => {
  try {
    // Fetch all admin records
    const caretakers = await Caretaker.find();

    // Loop through each admin record
    for (const caretaker of caretakers) {
      // Extract the contact and replace "254" with "0"
      const extractedContact = caretaker.contact.substring(3);
      const modifiedContact = `0${extractedContact}`;

      // Hash the modified contact
      const hashedPassword = bcrypt.hashSync(modifiedContact, 10);

      // Update the password field in the admin record
      caretaker.password = hashedPassword;
      caretaker.idNo = caretaker.idNo.toString();

      // Save the updated admin record
      await caretaker.save();
    }
  } catch (error) {
    console.error("Error updating caretaker passwords:", error);
  }
}

const confirmCaretakerCredentials = async ({
  userID,
  contactVerificationCode,
}: CaretakerCredentialsConfirmation) => {
  try {
    await connectMongoDB();

    const userData = await Caretaker.findById(userID).select("-password");
    let credentials = { isContactVerified: false };
    if (
      userData.contactVerificationCode === contactVerificationCode
    ) {
      credentials.isContactVerified = true;
      await Caretaker.findByIdAndUpdate(userID, credentials, {
        new: true,
        upsert: true,
      });
      const response = { status: 200, message: "Contact Confirmed" };
      return JSON.stringify(response);
    } else if (
      userData.contactVerificationCode !== contactVerificationCode
    ) {
      const response = { status: 401, message: "Contact token is invalid" };
      return JSON.stringify(response);
    } else {
      const response = { status: 401, message: "Tokens invalid" };
      return JSON.stringify(response);
    }
  } catch (err) {
    return handleError(err);
  }
};

const updateCaretakerPassword = async ({
  userID,
  password,
}: CaretakerPasswordUpdate) => {
  try {
    await connectMongoDB();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const credentials = {
      password: hashedPassword,
    };
    await Caretaker.findByIdAndUpdate(userID, credentials);
    const response = {
      status: 200,
      message: "Password updated",
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};


const findAllCaretakers = async () => {
  try {
    await connectMongoDB();
    const caretakerData = await Caretaker.find().select("-password");
    const response = {
      status: 200,
      message: "All caretakers found",
      payload: caretakerData,
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

const findCaretakerById = async (userID: string) => {
  try {

    await connectMongoDB();

    const caretakerData = await Caretaker.findById(userID).select("-password");

    const response = {
      status: 200,
      message: "Caretaker with specified ID found",
      payload: caretakerData,
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

const confirmCaretakerResetToken = async ({
  userID,
  resetToken,
}: ResetTokenConfirmation) => {
  try {
    await connectMongoDB();
    const caretakerData = await Caretaker.findById(userID).select("-password");
    if (caretakerData?.resetToken.includes(resetToken)) {
      const response = {
        status: 200,
        message: "Reset Token Confirmed",
      };
      return JSON.stringify(response);
    } else {
      const response = {
        status: 401,
        message: "The reset token is incorrect",
      };
      return JSON.stringify(response);
    }
  } catch (err) {
    console.log(err)
    return handleError(err);
  }
};

const disableCaretaker = async (data: CaretakerDataFetch) => {
  try {
    const { userID } = data;
    await connectMongoDB();
    const updatedStatusData = {
      status: "inactive"
    };
    await Caretaker.findByIdAndUpdate(
      userID,
      updatedStatusData
    );

    revalidatePath("/");
    const response = {
      status: 200,
      message: "Caretaker Deactivated",
    };
    return JSON.stringify(response);
  } catch (error: any) {
    return handleError(error);
  }
}

const enableCaretaker = async (data: CaretakerDataFetch) => {
  try {
    const { userID } = data;
    await connectMongoDB();
    const updatedStatusData = {
      status: "active"
    };
    await Caretaker.findByIdAndUpdate(
      userID,
      updatedStatusData
    );

    revalidatePath("/");
    const response = {
      status: 200,
      message: "Caretaker Activated",
    };
    return JSON.stringify(response);
  } catch (error: any) {
    return handleError(error);
  }
}


const deleteCaretakerById = async (userID: string) => {
  try {
    await connectMongoDB();
    await Caretaker.findByIdAndDelete(userID);
    revalidatePath("/")
    const response = {
      status: 200,
      message: "Caretaker information deleted successfully",
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

export {
  registerCaretaker,
  disableCaretaker,
  enableCaretaker,
  confirmCaretakerCredentials,
  confirmCaretakerResetToken,
  findCaretakerById,
  findAllCaretakers,
  updateCaretakerInfo,
  updateCaretakerPassword,

  deleteCaretakerById,
};
