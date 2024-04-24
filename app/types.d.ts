interface UserInfo {
    firstName: string,
    surname: string,
    contact: string,
    amount: number,
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