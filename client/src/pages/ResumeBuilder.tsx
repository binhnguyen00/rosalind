import React from "react";
import axios from 'axios';

import {
  ScrollShadow, Spinner,
  Card, CardHeader, CardBody, Image, cn,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { ArtBoard } from "@pages";
import { useResumeStore } from "@stores";
import { DefaultLayout, PocketBaseContext } from "@components";
import { Basics, Education, Work, Project } from "@components/resume";

export default function ResumeBuilder() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1.5fr_3fr_1fr] gap-4 h-full">

        <div className="border border-divider rounded overflow-hidden min-w-[400px]">
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full" hideScrollBar>
            <ResumeInfoPane />
          </ScrollShadow>
        </div>

        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>

        <div className="border border-divider rounded">
          <p className="text-2xl font-bold sticky p-2"> Properties </p>
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full overflow-visible" hideScrollBar>
            <ResumePropertiesPane />
          </ScrollShadow>
        </div>

      </div>
    </DefaultLayout>
  )
}

function ResumeInfoPane() {
  return (
    <div className="space-y-4 pb-4">

      <Basics />
      <Work />
      <Education />
      <Project />

    </div>
  )
}

function ResumePropertiesPane() {
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

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ["template-thumbnails"],
    queryFn: async () => {
      const response = await axios.get("https://picsum.photos/v2/list");
      return response.data;
    }
  });

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
    <div className="space-y-4">
      {data.map((template) => (
        <Card
          key={template.id}
          className={cn(
            "border border-divider",
            "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-110 active:scale-95 cursor-pointer",
            metadata.template === String(template.code).toLowerCase() ? "bg-success-200" : ""
          )}
          shadow="none"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-light"> {template.created} </p>
            <h4 className="font-bold text-large"> {template.label} </h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full max-h-[300px]"
              src={images[Math.floor(Math.random() * images.length)].download_url}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}