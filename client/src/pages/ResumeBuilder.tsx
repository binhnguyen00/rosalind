import { ScrollShadow, Tabs, Tab } from "@heroui/react";

import { ArtBoard } from "@pages";
import { DefaultLayout } from "@components";
import { Basics, Education, Work, Project, Theme, Font } from "@components/resume";

export default function ResumeBuilder() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1.5fr_3fr_1fr] gap-4 h-full">

        <div className="border border-divider rounded overflow-hidden min-w-[400px]">
          <ResumeInfoPane />
        </div>

        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>

        <div className="border border-divider rounded p-2 h-full">
          <ResumePropertiesPane />
        </div>

      </div>
    </DefaultLayout>
  )
}

function ResumeInfoPane() {
  return (
    <ScrollShadow orientation="vertical" className="p-2 space-y-4 h-full pb-4" hideScrollBar>
      <Basics />
      <Work />
      <Education />
      <Project />
    </ScrollShadow>
  )
}

function ResumePropertiesPane() {
  return (
    <div className="space-y-2">
      <p className="text-2xl font-bold sticky"> Properties </p>
      <Tabs aria-label="Options" destroyInactiveTabPanel={false}>
        <Tab key="templates" title="Templates">
          <ScrollShadow orientation="vertical" className="h-full overflow-visible space-y-4" hideScrollBar>
            <Theme />
          </ScrollShadow>
        </Tab>
        <Tab key="fonts" title="Fonts">
          <ScrollShadow orientation="vertical" className="h-full overflow-visible space-y-4" hideScrollBar>
            <Font />
          </ScrollShadow>
        </Tab>
      </Tabs>
    </div>
  )
}