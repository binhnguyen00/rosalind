import React from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Spinner, Card, CardHeader, CardBody, Image, cn } from "@heroui/react";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Themes() {
  const resumeStore = useResumeStore();
  const metadata = resumeStore.metadata;
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
    resumeStore.updateTemplate(lower);
  }

  return (
    <>
      {data.map((template) => (
        <div
          key={template.id}
          onClick={() => onSelect(template.code)}
        >
          <Card
            className={cn(
              "border border-divider",
              "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer",
              metadata.template === String(template.code).toLowerCase() ? "bg-blue-100" : ""
            )}
            shadow="none"
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-light"> {template.created} </p>
              <h4 className="font-bold text-large"> {template.label} </h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <ThemeThumbnail />
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  )
}

function ThemeThumbnail() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["template-thumbnails"],
    queryFn: async () => {
      const response = await axios.get("https://picsum.photos/v2/list");
      return response.data;
    }
  });

  if (isLoading) return (
    <div>
      <Spinner size="sm" />
    </div>
  );

  if (isError) return (
    <Image
      alt="Card background"
      className="rounded-xl w-full h-[300px] object-cover"
      src="https://http.cat/500"
    />
  );

  if (!data) return (
    <Image
      alt="Card background"
      className="rounded-xl w-full h-[300px] object-cover"
      src="https://http.cat/500"
    />
  )

  return (
    <Image
      alt="Card background"
      className="rounded-xl w-full h-[300px] object-cover"
      src={data[Math.floor(Math.random() * data.length)].download_url}
    />
  )
}