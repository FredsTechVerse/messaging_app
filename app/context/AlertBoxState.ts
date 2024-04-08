import { create } from "zustand";

type AlertBoxState = {
    status: "success" | "failure";
    isResponse: boolean;
    response: null | string;
    timeout: number;
    updateAlertBoxData: (data: AlertBoxProps) => void;
    initializeAlertBox: () => void;
};


const AlertBoxState = create<AlertBoxState>((set) => ({
    status: "failure",
    isResponse: false,
    response: null,
    timeout: 4500,
    updateAlertBoxData: ({ response, isResponse, status, timeout }) =>
        set(() => ({
            response,
            isResponse,
            status,
            timeout,
        })),
    initializeAlertBox: () =>
        set(() => ({
            response: null,
            isResponse: false,
            status: "failure",
            timeout: 4500,
        })),
}));

export default AlertBoxState;
