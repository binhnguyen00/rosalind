import React from "react";
import { RecordModel } from "pocketbase";
import { cn, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Fonts() {
  const { client: pocketBase } = React.useContext(PocketBaseContext);
  const metadata = useResumeStore((state) => state.metadata);
  const updateFont = useResumeStore((state) => state.updateFont);

  const query = useQuery({
    queryKey: ["fonts"],
    queryFn: async () => {
      const response = await pocketBase.collection<RecordModel>("font").getFullList();
      return response;
    },
    retryDelay: 1500,
    retry: (failureCount, error) => {
      return failureCount < 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (query.isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <Spinner className="self-center" />
      </div>
    )
  }

  if (query.isError) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <p className="text-red-500 self-center text-center"> {query.error.message} </p>
      </div>
    )
  }

  if (!query.data?.length) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <p className="text-red-500 self-center text-center">No fonts found</p>
      </div>
    )
  }

  const fonts: string = React.useMemo(() => {
    return query.data.map(f => f.label.replace(/ /g, "+")).join("&family=");
  }, [query.data]);

  return (
    <div className={cn(
      "flex flex-col gap-2 w-full",
      "aspect-auto pb-4",
    )}>
      {/* preview font */}
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${fonts}&display=swap`}
      />
      {query.data.map((font) => (
        <div
          key={font.id}
          className={cn(
            "p-3 rounded-xl",
            "transition-all duration-300 ease-in-out cursor-pointer",
            "active:scale-95",
            "border", "border-divider",
            "hover:border-blue-400", "hover:border-3",
            metadata.font === font.label ? " bg-blue-100" : ""
          )}
          onClick={() => updateFont(font.label)}
        >
          <p className="text-lg" style={{ fontFamily: font.label }}>{font.label}</p>
        </div>
      ))}
    </div>
  )
}