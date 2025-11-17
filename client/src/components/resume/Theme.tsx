import React from "react";
import axios from "axios";

import {
  ScrollShadow, Spinner, Tabs, Tab,
  Card, CardHeader, CardBody, Image, cn,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Themes() {
  const metadata = useResumeStore(state => state.metadata);
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
    <div>
      <p>No templates found</p>
    </div>
  );

  return (
    <>
      {data.map((template) => (
        <Card
          key={template.id}
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
      ))}
    </>
  )
}

function ThemeThumbnail() {
  const { data, isLoading, isError, error } = useQuery({
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
    <div>
      <Image
        alt="Card background"
        className="rounded-xl w-full h-[300px] object-cover"
        src="https://http.cat/500"
      />
    </div>
  );

  if (!data) return (
    <div>
      <Image
        alt="Card background"
        className="rounded-xl w-full h-[300px] object-cover"
        src="https://http.cat/500"
      />
    </div>
  )

  return (
    <Image
      alt="Card background"
      className="rounded-xl w-full h-[300px] object-cover"
      src={data[Math.floor(Math.random() * data.length)].download_url}
    />
  )
}