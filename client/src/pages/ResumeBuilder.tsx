import { ScrollShadow } from "@heroui/react";

import { ArtBoard } from "@pages";
import { DefaultLayout } from "@components";
import { Basics, Education, Work, Project } from "@pages/resume";

export default function ResumeBuilder() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1.5fr_3fr_1fr] gap-4 h-full">

        <div className="border border-divider rounded overflow-hidden">
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full">
            <ResumeInfoPane />
          </ScrollShadow>
        </div>

        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>

        <div className="border border-divider rounded overflow-hidden">
          <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full">
            <ResumePropertiesPane />
          </ScrollShadow>
        </div>

      </div>
    </DefaultLayout>
  )
}

function ResumeInfoPane() {
  return (
    <div className="flex flex-col gap-4">

      <Basics />
      <Work />
      <Education />
      <Project />

    </div>
  )
}

function ResumePropertiesPane() {
  return (
    <div>
      Resume Properties
    </div>
  )
}