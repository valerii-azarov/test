import { toast } from "react-toastify";
import { Options } from "../interfaces/options-interface";

type NotificationType = "success" | "error";

const defaultOptions: Options = {
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  icon: false,
};

export const Notification = (type: NotificationType, message: string, options?: Options) => {
  const notificationOptions = { ...defaultOptions, ...options };

  toast[type](message, {
    position: "top-right",
    ...notificationOptions,
  });
};
