import React from "react";
import { RecordModel } from "pocketbase";
import { useQuery } from "@tanstack/react-query";

import { PocketBaseContext } from "@components";

export const GlobalFontsContext = React.createContext({} as {
  isLoading: boolean;
  isError: boolean;
  error: Error;
  fonts: RecordModel[];
});

export default function GlobalFontsProvider({ children }: { children: React.ReactNode }) {
  const pocketbase = React.useContext(PocketBaseContext);
  const [fontsAsString, setFontsAsString] = React.useState<string>("");

  const query = useQuery({
    queryKey: ["fonts"],
    queryFn: async () => {
      const response = await pocketbase.client.collection<RecordModel>("font").getFullList();
      return response;
    },
    retryDelay: 1500,
    retry: (failureCount, error) => {
      console.error(error.message);
      return failureCount < 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const fonts: RecordModel[] = React.useMemo(() => {
    if (query.isError) return [];
    if (!query.data) return [];

    const results: string = query.data.map(font => font.label.replace(/ /g, "+")).join("&family=");
    setFontsAsString(results);

    return query.data;
  }, [query.data]);

  const preload = React.useMemo(() => {
    if (!fontsAsString) return <></>;
    return (
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${fontsAsString}&display=swap`}
      />
    )
  }, [fontsAsString]);

  return (
    <GlobalFontsContext.Provider value={{
      isLoading: query.isLoading,
      isError: query.isError,
      error: query.error as Error,
      fonts: fonts
    }}>
      {preload}
      {children}
    </GlobalFontsContext.Provider>
  )
}