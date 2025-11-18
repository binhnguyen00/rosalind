import React from "react";
import axios from "axios";

import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Card, CardHeader, CardBody, cn } from "@heroui/react";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Themes() {
  const metadata = useResumeStore((state) => state.metadata);
  const updateTemplate = useResumeStore((state) => state.updateTemplate);
  const pocketBase = React.useContext(PocketBaseContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const response = await pocketBase.collection("template").getFullList();
      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return (
    <div>
      <Spinner />
    </div>
  );

  if (isError) return (
    <div>
      <p>{error.message}</p>
    </div>
  );

  if (!data) return (
    <div className="flex flex-col">
      <p className="self-center">No templates found</p>
    </div>
  );

  const onSelect = (theme: string) => {
    if (!theme) return;
    const lower = String(theme).toLowerCase();
    updateTemplate(lower);
  }

  return (
    <>
      {data.map((template) => (
        <div
          key={template.id}
          className={cn(
            "aspect-3/4 pb-4", "w-full h-full",
            // data.length <= 1 ? "h-full" : "h-1/2"
          )}
          onClick={() => onSelect(template.code)}
        >
          <Card
            className={cn(
              "h-full w-full flex flex-col",
              "transition-all duration-300 ease-in-out cursor-pointer",
              "active:scale-95",
              "border", "border-divider",
              "hover:border-blue-400", "hover:border-3",
              metadata.template === String(template.code).toLowerCase() ? "bg-blue-100" : ""
            )}
            shadow="none"
            radius="none"
          >
            <CardHeader className="flex-col items-start shrink-0">
              {template.created && (
                <p className="text-tiny uppercase font-light">
                  {format(parseISO(template.created), "dd/MM/yyyy HH:mm:ss")}
                </p>
              )}
              <h4 className="font-bold text-large"> {template.label} </h4>
            </CardHeader>
            <CardBody className="p-2">
              <ThemeThumbnail id={template.id} />
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  )
}

const ThemeThumbnail = React.memo(({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["template-thumbnails", id],
    queryFn: async () => {
      const response = await axios.get("https://picsum.photos/v2/list");
      return response.data;
    },
    retryDelay: 1000,
    retry: (failureCount, error) => {
      return failureCount < 1;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return (
    <div>
      <Spinner size="sm" />
    </div>
  );

  if (isError) return (
    <img
      alt="Card background"
      className="w-full h-full object-cover"
      src="https://http.cat/500"
    />
  );

  if (!data) return (
    <img
      alt="Card background"
      className="w-full h-full object-cover"
      src="https://http.cat/500"
    />
  )

  return (
    <img
      alt="Card background"
      className="w-full h-full object-cover"
      src={data[Math.floor(Math.random() * data.length)].download_url}
    />
  )
});