import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { cn, ScrollShadow, Spinner } from "@heroui/react";

import { useResumeStore } from "@stores";
import { DefaultLayout, PocketBaseContext } from "@components";

export default function Home() {
  const navigate = useNavigate();
  const resumeStore = useResumeStore();

  const onCreateResume = () => {
    resumeStore.reset();
    navigate("/resume/new");
  }

  return (
    <DefaultLayout>
      <ScrollShadow orientation="vertical" className="h-full overflow-visible">
        <div className="flex flex-wrap gap-6 p-4">
          <div
            className={cn(
              "h-[300px]", "w-[200px]",
              "flex items-center justify-center rounded-2xl border border-divider",
              "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
            )}
            onClick={onCreateResume}
          >
            <Plus className="w-10 h-10" />
          </div>
          <Resumes />
        </div>
      </ScrollShadow>
    </DefaultLayout>
  );
}

function Resumes() {
  const navigate = useNavigate();
  const resumeStore = useResumeStore();
  const pocketBase = React.useContext(PocketBaseContext);

  const onOpenResume = (id: string) => {
    resumeStore.updateId(id);
    navigate(`/resume/${id}`);
  }

  const { data: resumes, isLoading, isError, error } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await pocketBase.collection("resume").getFullList({
        sort: "-created",
      });
      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
  });

  const renderResumes = () => {
    let html: React.ReactNode[] = [];
    if (!resumes) return html;

    resumes.map((resume, idx) => {
      html.push(
        <div
          key={resume.id}
          className={cn(
            "h-[300px]", "w-[200px]", "p-2",
            "flex flex-col gap-5 justify-center items-center rounded-2xl border border-divider",
            "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
          )}
          onClick={() => onOpenResume(resume.id)}
        >
          <p className="line-clamp-4 w-full px-2 text-center wrap-break-word text-lg font-semibold">
            {resume.label}
          </p>
          {resume.created && (
            <p className="text-center text-xs text-gray-500">
              {format(parseISO(resume.created), "dd/MM/yyyy HH:mm:ss")}
            </p>
          )}
        </div>
      );
    });

    return html;
  }

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center">
      <Spinner />
    </div>
  );

  if (isError) return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-danger">Error: {error.message}</span>
    </div>
  );

  return renderResumes();
}