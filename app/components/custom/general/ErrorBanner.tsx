import { FC } from "react";
interface ErrorMessageProps {
  message: string;
}
const ErrorBanner: FC<ErrorMessageProps> = (props) => {
  return (
    <p
      className=" text-red-800 max-w-72 tablet:max-w-[360px] rounded-full text-center text-sm "
      data-testid="errorBanner"
    >
      {props.message}
    </p>
  );
};
export default ErrorBanner;
