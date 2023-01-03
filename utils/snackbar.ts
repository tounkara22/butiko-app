import { OptionsObject } from "notistack";

interface ISnackbarOptions {
  variant?: "success" | "error";
  callback?: () => void;
  duration?: number;
  position?:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-right"
    | "bottom-left";
}

/**
 * Defines the options to provide for the snackbar display
 */
export const getSnackbarOptions = ({
  variant = "success",
  callback,
  duration = 4000,
  position,
}: ISnackbarOptions) => {
  const p = position?.split("-") || ["top", "center"];
  return {
    variant,
    autoHideDuration: duration,
    onClose: callback,
    anchorOrigin: {
      vertical: p[0],
      horizontal: p[1],
    },
  } as OptionsObject;
};
