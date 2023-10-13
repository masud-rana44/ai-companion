"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

export const DemoAccount = () => {
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedPassword, setIsCopiedPassword] = useState(false);
  const onClick = (text: string) => {
    text === "#temp1234" ? setIsCopiedPassword(true) : setIsCopiedEmail(true);
    navigator.clipboard.writeText(text);
    setTimeout(
      () =>
        text === "#temp1234"
          ? setIsCopiedPassword(false)
          : setIsCopiedEmail(false),
      1000,
    );
  };

  return (
    <div className="text-center text-sm">
      <h3 className="mb-1 text-lg font-medium uppercase text-rose-500">
        Demo Account
      </h3>
      <div className="flex flex-col -space-y-2">
        <div className="flex items-center">
          <p className="space-x-[2px]">
            <span className=" font-medium uppercase text-rose-600">Email:</span>{" "}
            <span className="text-gray-200">tuser4818@gmail.com</span>{" "}
          </p>
          {isCopiedEmail ? (
            <ClipboardCheck
              onClick={() => onClick("tuser4818@gmail.com")}
              className="h-8 w-8 cursor-pointer rounded-full p-2 text-gray-200 transition hover:text-white"
            />
          ) : (
            <Clipboard
              onClick={() => onClick("tuser4818@gmail.com")}
              className="h-8 w-8 cursor-pointer rounded-full p-2 text-gray-200 transition hover:text-white"
            />
          )}
        </div>
        <div className="flex items-center">
          <p className="space-x-[2px]">
            <span className="font-medium uppercase text-rose-600 ">
              Password:
            </span>{" "}
            <span className="text-gray-200">#temp1234</span>
          </p>
          {isCopiedPassword ? (
            <ClipboardCheck
              onClick={() => onClick("#temp1234")}
              className="h-8 w-8 cursor-pointer rounded-full p-2 text-gray-200 transition hover:text-white"
            />
          ) : (
            <Clipboard
              onClick={() => onClick("#temp1234")}
              className="h-8 w-8 cursor-pointer rounded-full p-2 text-gray-200 transition hover:text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};
