import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ScrollShadow, Tabs, Tab } from "@heroui/react";
import { GripVertical } from "lucide-react";

import { ArtBoard } from "@pages";
import { DefaultLayout } from "@components";
import {
  Themes, Fonts,
  Basics, Skills, Work, Project, Education, Certificates, Awards, Publications, Volunteer, Languages, Interests, References,
} from "@components/resume";

export default function ResumeBuilder() {

  return (
    <DefaultLayout className="p-2 h-screen">
      <PanelGroup direction="horizontal" className="h-full">

        <Panel id="left" order={1} defaultSize={25} minSize={20} maxSize={40} collapsible>
          <div className="h-full bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50">
            <ResumeInfoPane />
          </div>
        </Panel>

        <PanelResizeHandle className="w-4 flex items-center justify-center">
          <GripVertical size={24} />
        </PanelResizeHandle>

        <Panel id="center" order={2} defaultSize={50} minSize={30}>
          <div className="h-full bg-white dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-300/50 dark:shadow-slate-950/50 overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <ArtBoard />
          </div>
        </Panel>

        <PanelResizeHandle className="w-4 flex items-center justify-center">
          <GripVertical size={24} />
        </PanelResizeHandle>

        <Panel id="right" order={3} defaultSize={25} minSize={20} maxSize={25} collapsible>
          <div className="h-full bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50">
            <ResumePropertiesPane />
          </div>
        </Panel>

      </PanelGroup >
    </DefaultLayout >
  );
}

function ResumeInfoPane() {
  return (
    <ScrollShadow orientation="vertical" className="p-2 space-y-4 flex-1 pb-4" hideScrollBar>
      <Basics />
      <Skills />
      <Work />
      <Project />
      <Education />
      <Certificates />
      <Awards />
      <Publications />
      <Volunteer />
      <Languages />
      <Interests />
      <References />
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