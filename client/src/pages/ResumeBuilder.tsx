import { ScrollShadow } from "@heroui/react";
import { DefaultLayout } from "@components";
import { ArtBoard, ResumeInfo, ResumeProperties } from "@pages";

export default function ResumeBuilder() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1.5fr_3fr_1fr] gap-4 h-full">
        <div className="border border-divider rounded overflow-hidden">
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full">
            <ResumeInfo />
          </ScrollShadow>
        </div>
        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>
        <div className="border border-divider rounded overflow-hidden">
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full">
            <ResumeProperties />
          </ScrollShadow>
        </div>
      </div>
    </DefaultLayout>
  )
}