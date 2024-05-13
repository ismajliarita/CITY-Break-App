

export function toastError(toast, error) {
  toast({
    title: prettifyErrorMessage(error),
    status: "error",
    isClosable: true,
  });
}

export function toastSuccess(toast, message) {
  toast({
    title: message,
    status: "success",
    isClosable: true,
  });
}

export function prettifyErrorMessage(error) {
  if (error.message) {
    return error.message;
  } else {
    return "An error occurred";
  }
}

