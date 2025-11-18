import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ScrollShadow, Tabs, Tab, cn } from "@heroui/react";
import { Tally2 } from "lucide-react";

import { ArtBoard } from "@pages";
import { DefaultLayout } from "@components";
import { Basics, Education, Work, Project, Themes, Fonts } from "@components/resume";

export default function ResumeBuilder() {

  return (
    <DefaultLayout className="p-2 h-screen">
      <PanelGroup direction="horizontal">

        <Panel>
          <div className="border border-divider rounded overflow-hidden h-full flex flex-col">
            <ResumeInfoPane />
          </div>
        </Panel>

        <PanelResizeHandle className={cn(
          "p-1",
          "transition-colors", "duration-300",
          "hover:bg-blue-200", "hover:cursor-col-resize"
        )} />

        <Panel minSize={30}>
          <div className="border border-divider rounded overflow-hidden h-full flex flex-col">
            <ArtBoard />
          </div>
        </Panel>

        <PanelResizeHandle className={cn(
          "p-1",
          "transition-colors", "duration-300",
          "hover:bg-blue-200", "hover:cursor-col-resize"
        )} />

        <Panel>
          <div className="border border-divider rounded overflow-hidden h-full flex flex-col">
            <ResumePropertiesPane />
          </div>
        </Panel>

      </PanelGroup>
    </DefaultLayout>
  )
}

function ResumeInfoPane() {
  return (
    <ScrollShadow orientation="vertical" className="p-2 space-y-4 flex-1 pb-4" hideScrollBar>
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
        panel: "p-2 pb-[60px] h-full flex flex-col flex-1",
      }}
    >
      <Tab key="templates" title="Templates">
        <ScrollShadow
          orientation="vertical" hideScrollBar size={20}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-2"
        >
          <Themes />
          <Themes />
        </ScrollShadow>
      </Tab>
      <Tab key="fonts" title="Fonts">
        <ScrollShadow
          orientation="vertical" hideScrollBar size={20}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-2"
        >
          <Fonts />
        </ScrollShadow>
      </Tab>
    </Tabs>
  )
}