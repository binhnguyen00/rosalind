import React from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";

import { cn, addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

interface PocketBaseCtx {
  client: PocketBase;
  login: ({ userOrEmail, password }: {
    userOrEmail: string;
    password: string;
  }) => void;
  isLoggingIn: boolean;
  logout: () => void;
}

export const PocketBaseContext = React.createContext({} as PocketBaseCtx);

export default function PocketBaseProvider({ client, children }: { client: PocketBase, children: React.ReactNode }) {
  const navigate = useNavigate();

  const login = async ({ userOrEmail, password }: {
    userOrEmail: string;
    password: string;
  }) => {
    console.log(userOrEmail, password);
    await client.collection("users").authWithPassword(userOrEmail, password);
    return;
  }

  const logout = async () => {
    if (client.authStore.isValid) {
      await client.authStore.clear();
    } else {
      console.log("Already logout");
    }
    return;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    retry: false,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Login successfully",
        hideCloseButton: true,
        classNames: {
          base: cn([
            "border border-l-8 rounded-md",
            "flex flex-col items-start gap-4",
            "border-success-200 dark:border-success-100 border-l-success",
            "text-success-500",
          ]),
          icon: "w-6 h-6 fill-current",
        }
      });
      navigate("/");
    },
    onError: (error) => {
      addToast({
        title: "Signin failed",
        description: (
          <div className="space-y-2">
            <span className="text-xs"> {error.message} </span>
          </div>
        ),
        hideCloseButton: true,
        classNames: {
          base: cn([
            "border border-l-8 rounded-md",
            "flex flex-col items-start gap-4",
            "border-danger-200 dark:border-danger-100 border-l-danger",
            "text-danger-500",
          ]),
          icon: "w-6 h-6 fill-current",
        }
      });
    }
  })

  return (
    <PocketBaseContext.Provider value={{
      client: client,
      login: mutate,
      isLoggingIn: isPending,
      logout: logout,
    }}>
      {children}
    </PocketBaseContext.Provider>
  )
}