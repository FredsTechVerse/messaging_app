interface UserInfo {
    _id: string;
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
    paymentInfo: PaymentInfo[];
}
type PaymentInfo = {
    _id: string;
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
    status: string;
    date: Date;
    referenceID: string
};

interface MessageInfo {
    _id: string;
    message: string;
    totalCount: number;
    successful: number;
    unsuccessful: number;
    unsuccessfulRecipients: string[];
    successfulRecipients: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

type AlertBoxProps = {
    response: string;
    isResponse: boolean;
    status: "success" | "failure";
    timeout: number;
};

type UserFormState = {
    isProfileUpdateOpen: boolean;
    toggleProfileUpdate: () => void;
    isUserFormSubmitted: boolean;
    setIsUserFormSubmitted: (status: boolean) => void;
    userRole: null | string;
    setUserRole: (userRole: any) => void;
    aboutID: null | string;
    setUserID: (userID: any) => void;
};

type MessageFormState = {
    isMessageFormOpen: boolean;
    isMessageFormSubmitted: boolean;
    messageID: string | null;
    toggleMessageForm: () => void;
    setMessageID: (resourceID: string) => void;
    setIsMessageFormSubmitted: (status: boolean) => void;
    resetMessageID: () => void;
};