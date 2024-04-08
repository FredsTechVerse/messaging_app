"use client";

interface handleUIErrorsProps {
    status: number;
    message: string;
    updateAlertBoxData: (data: AlertBoxProps) => void;
}
interface handleUISuccessProps {
    message: string;
    updateAlertBoxData: (data: AlertBoxProps) => void;
}

interface handleSyntaxErrorsProps {
    err: any;
    updateAlertBoxData: (data: AlertBoxProps) => void;
}

const handleUISuccess = async ({
    updateAlertBoxData,
    message,
}: handleUISuccessProps) => {
    updateAlertBoxData({
        response: message,
        isResponse: true,
        status: "success",
        timeout: 3000,
    });
};

const handleSyntaxErrors = async ({
    updateAlertBoxData,
    err,
}: handleSyntaxErrorsProps) => {
    updateAlertBoxData({
        response: err,
        isResponse: true,
        status: "failure",
        timeout: 3000,
    });
};

const handleUIErrors = async ({
    message,
    updateAlertBoxData,
}: handleUIErrorsProps) => {

    updateAlertBoxData({
        response: message,
        isResponse: true,
        status: "failure",
        timeout: 3000,
    });
};

export { handleUIErrors, handleUISuccess, handleSyntaxErrors };
