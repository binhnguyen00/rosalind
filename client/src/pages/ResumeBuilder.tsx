import { ScrollShadow, Tabs, Tab } from "@heroui/react";

import { ArtBoard } from "@pages";
import { DefaultLayout } from "@components";
import { Basics, Education, Work, Project, Themes, Fonts } from "@components/resume";

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

        <div className="border border-divider rounded overflow-hidden">
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
    <Tabs
      aria-label="Options" destroyInactiveTabPanel={false}
      classNames={{
        tabList: "flex-shrink-0",
        base: "p-2",
        panel: "p-2 pb-15 h-full",
      }}
    >
      <Tab key="templates" title="Templates">
        <ScrollShadow
          orientation="vertical" hideScrollBar size={20}
          className="grid grid-cols-1 h-full"
        >
          <Themes />
          <Themes />
          <Themes />
          <Themes />
        </ScrollShadow>
      </Tab>
      <Tab key="fonts" title="Fonts">
        <ScrollShadow orientation="vertical" hideScrollBar className="grid grid-cols-2 h-full">
          <Fonts />
        </ScrollShadow>
      </Tab>
    </Tabs>
  )
}