import React from "react";
import PocketBase from "pocketbase";
import { useMutation } from "@tanstack/react-query";

interface PocketBaseCtx {
  client: PocketBase;
  login: ({ userOrEmail, password }: {
    userOrEmail: string;
    password: string;
  }) => void;
  logout: () => void;
}

export const PocketBaseContext = React.createContext({} as PocketBaseCtx);

export default function PocketBaseProvider({ client, children }: { client: PocketBase, children: React.ReactNode }) {

  const { mutate, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ userOrEmail, password }: {
      userOrEmail: string;
      password: string;
    }) => {
      // "binh.nguyen@gmail.com", "123456789"
      await client.collection("users").authWithPassword(userOrEmail, password);
      return;
    }
  })

  const logout = () => {
    if (client.authStore.isValid) {
      client.authStore.clear();
    } else {
      console.log("Already logout");
    }
    return;
  }

  return (
    <PocketBaseContext.Provider value={{
      client: client,
      login: mutate,
      logout: logout,
    }}>
      {children}
    </PocketBaseContext.Provider>
  )
}