"use server";
import Admin from "@/app/auth/models/admin";
import bcrypt from "bcryptjs";
import { generateRandomString } from "@/app/auth/libs/authentication";
import { sendUserMessage } from "@/lib/messageActions";
import { handleError } from "@/lib/errorHandling";
import connectMongoDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
interface AdminCredentials {
  fName: string;
  surname: string;
  idNo: string;
  contact: string;
}
interface AdminCredentialsUpdate {
  userID: string;
  fName: string;
  surname: string;
  idNo: string;
  contact: string;
}

interface AdminCredentialsConfirmation {
  userID: string;
  contactVerificationCode: string;
}

interface AdminDataFetch {
  userID: string;
}

interface AdminPasswordUpdate {
  userID: string;
  password: string;
}

interface ResetTokenConfirmation {
  userID: string;
  resetToken: string;
}

const registerAdmin = async ({
  fName,
  surname,
  idNo,
  contact,
}: AdminCredentials) => {
  try {

    await connectMongoDB();
    const extractedContact = contact.substring(3);
    const hashedPassword = bcrypt.hashSync(`0${extractedContact}`, 10);
    const contactVerificationCode = await generateRandomString(6);
    const message = `Hello ${fName.toUpperCase()} ,Admin,${contactVerificationCode} is your contact verification code.`;
    revalidatePath("/")
    const credentials = {
      fName: fName,
      surname: surname,
      idNo,
      contact: contact,
      contactVerificationCode,
      password: hashedPassword,
    };

    const newAdmin = await Admin.create(credentials);
    newAdmin.save();

    sendUserMessage({
      recipients: [`+${contact}`],
      message: message,
    });

    const response = {
      status: 201,
      message: "Admin registered",
      payload: newAdmin

    };
    return JSON.stringify(response);
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
};
const disableAdmin = async (data: AdminDataFetch) => {
  try {
    const { userID } = data;
    await connectMongoDB();
    const updatedStatusData = {
      status: "inactive"
    };
    await Admin.findByIdAndUpdate(
      userID,
      updatedStatusData
    );

    revalidatePath("/");
    const response = {
      status: 200,
      message: "Admin Deactivated",
    };
    return JSON.stringify(response);
  } catch (error: any) {
    return handleError(error);
  }
}

const enableAdmin = async (data: AdminDataFetch) => {
  try {
    const { userID } = data;
    await connectMongoDB();
    const updatedStatusData = {
      status: "active"
    };
    await Admin.findByIdAndUpdate(
      userID,
      updatedStatusData
    );

    revalidatePath("/");
    const response = {
      status: 200,
      message: "Admin Activated",
    };
    return JSON.stringify(response);
  } catch (error: any) {
    return handleError(error);
  }
}

const updateAdminInfo = async ({
  userID,
  fName,
  surname,
  idNo,
  contact,
}: AdminCredentialsUpdate) => {
  try {
    await connectMongoDB();

    const credentials = {
      fName: fName,
      surname: surname,
      idNo: idNo,
      contact: contact,
    };
    await Admin.findByIdAndUpdate(userID, credentials);
    revalidatePath("/")
    const response = {
      status: 200,
      message: "Admin information updated",
    };

    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

export const updateAdminPasswords = async () => {
  try {
    // Fetch all admin records
    const admins = await Admin.find();

    // Loop through each admin record
    for (const admin of admins) {
      // Extract the contact and replace "254" with "0"
      const extractedContact = admin.contact.substring(3);
      const modifiedContact = `0${extractedContact}`;

      // Hash the modified contact
      const hashedPassword = bcrypt.hashSync(modifiedContact, 10);

      // Update the password field in the admin record
      admin.password = hashedPassword;
      admin.idNo = admin.idNo.toString()
      // Save the updated admin record
      await admin.save();
    }
  } catch (error) {
    console.error("Error updating admin passwords:", error);
  }
}

const confirmAdminCredentials = async ({
  userID,
  contactVerificationCode,
}: AdminCredentialsConfirmation) => {
  try {
    await connectMongoDB();
    const userData = await Admin.findById(userID).select("-password");
    let credentials = { isContactVerified: false };
    if (
      userData.contactVerificationCode === contactVerificationCode
    ) {
      credentials.isContactVerified = true;
      await Admin.findByIdAndUpdate(userID, credentials, {
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

const updateAdminPassword = async ({
  userID,
  password,
}: AdminPasswordUpdate) => {
  try {
    await connectMongoDB();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const credentials = {
      password: hashedPassword,
    };
    await Admin.findByIdAndUpdate(userID, credentials);
    const response = {
      status: 200,
      message: "Admin information updated",
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};


const findAdminById = async (userID: string) => {
  try {
    await connectMongoDB();
    const adminData = await Admin.findById(userID).select("-password");
    const response = {
      status: 200,
      message: "Admin with specified ID found",
      payload: adminData,
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

const findAllAdmins = async () => {
  try {
    await connectMongoDB();
    const adminData = await Admin.find().select("-password");
    const response = {
      status: 200,
      message: "All admins found",
      payload: adminData,
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};


const confirmAdminResetToken = async ({
  userID,
  resetToken,
}: ResetTokenConfirmation) => {
  try {
    await connectMongoDB();
    const adminData = await Admin.findById(userID).select("-password");
    if (adminData?.resetToken.includes(resetToken)) {
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
    return handleError(err);
  }
};


const deleteAdminById = async (userID: string) => {
  try {
    await connectMongoDB();
    await Admin.findByIdAndDelete(userID);
    revalidatePath("/")
    const response = {
      status: 200,
      message: "Admin information deleted successfully",
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};

export {
  registerAdmin,
  confirmAdminCredentials,
  confirmAdminResetToken,
  findAdminById,
  findAllAdmins,
  updateAdminInfo,

  updateAdminPassword,
  deleteAdminById,
  disableAdmin,
  enableAdmin,
};
