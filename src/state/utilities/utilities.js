import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

Array.prototype.toSentence = function (comma, and) {
  const b = this.pop();
  return (b ? (this.length ? [this.join(`${comma} ` || ", "), b] : [b]) : this).join(
    ` ${and} ` || " and "
  );
};

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

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

export const queryParamsToObject = (string) => {
  const obj = {};
  string
    .replace(/\?/g, "")
    .replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  return obj;
};
