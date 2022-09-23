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

export const removeDuplicates = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter(i => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};