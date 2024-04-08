import { FC } from "react";
interface ErrorMessageProps {
  message: string | undefined;
}
const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  return (
    <p className=" text-red-800 max-w-72 tablet:max-w-[360px] rounded-full text-center text-sm ">
      {props.message}
    </p>
  );
};
export default ErrorMessage;
