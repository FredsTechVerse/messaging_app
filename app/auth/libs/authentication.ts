"use server";
import CareTaker from "../models/caretaker";
import Admin from "../models/admin";
import { handleError } from "@/lib/errorHandling";
import connectMongoDB from "@/lib/mongodb";
import { sendUserMessage } from "@/lib/messageActions";

interface ContactVerification {
  idNo: string;
  role: string;
}

const generateRandomString = async (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const verifyContact = async ({
  idNo,
  role: passedRole,
}: ContactVerification) => {
  try {
    let userData = null;
    await connectMongoDB();
    if (passedRole === "EM-202") {
      userData = await CareTaker.findOne({ idNo });
    } else if (passedRole === "EM-203") {
      userData = await Admin.findOne({ idNo });
    }
    if (!userData) {
      const response = {
        status: 404,
        message: "Invalid Credentials",
      };
      return JSON.stringify(response);
    }

    // We generate the necessary credentials
    const resetToken = await generateRandomString(6);
    const userID = userData?._id;
    const decryptedRole = userData?.role;
    const decryptUserRole = () => {
      if (decryptedRole === "EM-202") {
        const response = "Caretaker";
        return response;
      } else if (decryptedRole === "EM-203") {
        const response = "Admin";
        return response;
      } else if (decryptedRole === "EM-201") {
        const response = "Tenant";
        return response;
      } else {
        const response = "Guest";
        return response;
      }
    };
    const generatedResetToken = { resetToken };
    let capitalizedName = userData?.fName.charAt(0).toUpperCase() + userData?.fName.slice(1).toLowerCase();

    const message = `Hello ${capitalizedName},${resetToken} is your reset token for your ${decryptUserRole().toUpperCase()} account`;

    sendUserMessage({
      recipients: [`+${userData.contact}`],
      message,
    });
    if (decryptedRole === "EM-202") {
      await CareTaker.findByIdAndUpdate(userID, generatedResetToken, {
        new: true,
        upsert: true,
      });
    } else if (decryptedRole === "EM-203") {
      await Admin.findByIdAndUpdate(userID, generatedResetToken, {
        new: true,
        upsert: true,
      });
    }
    const response = {
      status: 200,
      message: "Verification successful",
      payload: { role: decryptedRole, userID },
    };
    return JSON.stringify(response);
  } catch (err) {
    return handleError(err);
  }
};



export {
  verifyContact,
  generateRandomString,
};
