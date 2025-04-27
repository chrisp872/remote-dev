import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let errorMessage = "An unknown error occurred.";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  toast.error(errorMessage);
};
