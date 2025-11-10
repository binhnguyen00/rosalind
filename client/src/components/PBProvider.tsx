import React from "react";
import PocketBase from "pocketbase";
import { useQuery } from "@tanstack/react-query";

export const PocketBaseContext = React.createContext({} as PocketBase);

export default function PocketBaseProvider({ client, children }: { client: PocketBase, children: React.ReactNode }) {
  useQuery({
    queryKey: ["auth-store"],
    queryFn: async () => await client.collection("users").authWithPassword("binh.nguyen@gmail.com", "123456789"),
  })

  return (
    <PocketBaseContext.Provider value={client}>
      {children}
    </PocketBaseContext.Provider>
  )
}