import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const toastErrorMessage = (messages) => {
  messages.forEach((message) => {
    toast({
      title: message,
      status: "error",
    });
  });
};