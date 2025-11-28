import React from "react";
import axios from "axios";

import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Card, CardHeader, CardBody, cn } from "@heroui/react";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Templates() {
  const metadata = useResumeStore((state) => state.metadata);
  const updateTemplate = useResumeStore((state) => state.updateTemplate);
  const { client: pocketBase } = React.useContext(PocketBaseContext);

  const templates = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const response = await pocketBase.collection("template").getFullList();
      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const thumbnails = useQuery({
    queryKey: ["template-thumbnails"],
    queryFn: async () => {
      const response = await axios.get("https://picsum.photos/v2/list");
      return response.data;
    },
    staleTime: Infinity,
  });

  const renderThumbnail = React.useCallback(() => {
    if (thumbnails.isLoading) return (
      <div>
        <Spinner />
      </div>
    );

    if (thumbnails.isError) return (
      <div>
        <p>{thumbnails.error.message}</p>
      </div>
    );

    if (!thumbnails.data) return (
      <div className="flex flex-col">
        <p className="self-center">No thumbnails found</p>
      </div>
    );

    return (
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src={thumbnails.data[Math.floor(Math.random() * thumbnails.data.length)].download_url}
      />
    )
  }, [thumbnails.data]);

  if (templates.isLoading) return (
    <div>
      <Spinner />
    </div>
  );

  if (templates.isError) return (
    <div>
      <p>{templates.error.message}</p>
    </div>
  );

  if (!templates.data) return (
    <div className="flex flex-col">
      <p className="self-center">No templates found</p>
    </div>
  );

  const onSelect = (theme: string) => {
    if (!theme) return;
    updateTemplate(String(theme).toLowerCase());
  }

  return (
    <>
      {templates.data.map((template) => (
        <div
          key={template.id}
          className={cn(
            "aspect-3/4 pb-4", "w-full h-full",
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
              {renderThumbnail()}
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  )
}