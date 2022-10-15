import { createStandaloneToast } from "@chakra-ui/react";
import { Buffer } from "buffer";

const { toast } = createStandaloneToast();

export const toastMessage = (messages, status = "error") => {
  messages.forEach((message) => {
    toast({
      title: message,
      status: status,
    });
  });
};

export const removeDuplicates = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter((i) => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const pluck = (array, key) => {
  var pluckedArray = [];
  array.forEach((item) => {
    if (item.hasOwnProperty(key)) {
      pluckedArray.push(item[key]);
    }
  });
  return pluckedArray;
};

export const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr(
    "data:application/pdf;base64,".length
  );

  // // const bytes = atob(base64WithoutPrefix);
  const buffer = Buffer.from(base64WithoutPrefix, "base64");
  // debugger
  // let length = bytes.length;
  // let out = new Uint8Array(length);

  // while (length--) {
  //   out[length] = bytes.charCodeAt(length);
  // }

  return new Blob(buffer, { type: "application/pdf" });
};
