import { sendEmail } from "./emailActions";
const handleError = (err: any) => {
    let statusCode = 500;
    let errorMessage = "Sorry,something went wrong";

    if (err.code === 11000) {
        statusCode = 409;
        errorMessage = "This information already exists";
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        errorMessage = err.message;
    } else if (err.name === "CastError") {
        statusCode = 422;
        errorMessage = "The resource identity is invalid or doesn't exist.";
    } else {
        errorMessage = err.message;
    }

    const emailMessage = `Error description , ${JSON.stringify(err)} `;
    const response = {
        status: statusCode,
        message: errorMessage,
    };
    if (err.message) {
        sendEmail({
            to: process.env.TROUBLESHOOTING_EMAIL_ACCOUNT,
            subject: err.message.toUpperCase(),
            text: emailMessage,
        });
    }
    return JSON.stringify(response);
};


export { handleError };
