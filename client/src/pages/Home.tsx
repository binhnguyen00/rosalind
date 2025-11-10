import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn, ScrollShadow } from "@heroui/react";
import { DefaultLayout } from "@components";

export default function Home() {
  const navigate = useNavigate();

  const renderResumes = () => {
    let html: React.ReactNode[] = [];
    Array.from({ length: 20 }).forEach((ele, idx) => {
      html.push(
        <div
          key={idx}
          className={cn(
            "flex items-center justify-center rounded-2xl border border-divider",
            "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
          )}
        >
          <p>{idx}</p>
        </div>
      );
    });
    return html;
  }

  const onCreateResume = () => {
    navigate("/resume/new");
  }

  return (
    <DefaultLayout>
      <ScrollShadow orientation="vertical" className="h-full overflow-y-auto">
        <div className="grid grid-cols-4 gap-6 auto-rows-[300px] p-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-2xl border border-divider",
              "transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
            )}
            onClick={onCreateResume}
          >
            <Plus className="w-10 h-10" />
          </div>
          {renderResumes()}
        </div>
      </ScrollShadow>
    </DefaultLayout>
  );
}