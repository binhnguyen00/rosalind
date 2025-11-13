import React from "react";
import HandleBars from "handlebars";

import { Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { FileDown, ZoomIn, ZoomOut, FlipHorizontal } from "lucide-react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import { PocketBaseContext } from "@components";
import {
  useBasicsStore, useEducationStore, useResumeStore, useWorkStore,
  useProjectStore
} from "@stores";

export default function ArtBoard() {
  const templateRef = React.useRef<HTMLDivElement>(null);

  const onExport = () => {
    if (!templateRef.current) return;
    if (templateRef.current.shadowRoot) {
      console.log(templateRef.current.shadowRoot.innerHTML);
    }
  };

  const Controls = () => {
    const { zoomIn, zoomOut, centerView } = useControls();

    return (
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-2">
        <Button
          variant="solid" size="sm" color="primary" isIconOnly
          onPress={onExport}
        >
          <FileDown size={18} />
        </Button>
        <Button
          variant="solid" size="sm" color="primary" isIconOnly
          onPress={() => zoomIn(0.2)}
        >
          <ZoomIn size={18} />
        </Button>
        <Button
          variant="solid" size="sm" color="primary" isIconOnly
          onPress={() => zoomOut(0.2)}
        >
          <ZoomOut size={18} />
        </Button>
        <Button
          variant="solid" size="sm" color="primary" isIconOnly
          onPress={() => {
            centerView(0.8);
          }}
        >
          <FlipHorizontal size={18} />
        </Button>
      </div>
    )
  };

  return (
    <div className="relative">

      <div className="w-full h-screen overflow-hidden">
        <TransformWrapper
          centerOnInit
          maxScale={2}
          minScale={0.4}
          initialScale={0.8}
          limitToBounds={false}
        >
          {() => (
            <>
              <Controls />
              <TransformComponent
                contentClass="grid items-start justify-center pointer-events-none"
                contentStyle={{ height: "100%" }}
                wrapperStyle={{ height: "100%", width: "100%" }}
              >
                <div className="min-h-[1122.66px] w-[793.8px] border">
                  <Template ref={templateRef} />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

    </div>
  )
}

const Template = React.forwardRef<HTMLDivElement>((props, ref) => {
  const metadata = useResumeStore(state => state.metadata);
  const basics = useBasicsStore(state => state.store);
  const educations = useEducationStore(state => state.store);
  const works = useWorkStore(state => state.store);
  const projects = useProjectStore(state => state.store);

  const pocketBase = React.useContext(PocketBaseContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { data: template, isLoading, isError, error } = useQuery({
    queryKey: ["template", metadata.template],
    queryFn: async () => {
      return await pocketBase.collection("template").getFirstListItem(
        `code="${metadata.template}"`
      );
    }
  });

  // export containerRef to parent component
  React.useImperativeHandle(ref, () => containerRef.current!, []);

  React.useEffect(() => {
    if (!template) return;
    if (!containerRef.current) return;

    const hbs = HandleBars.compile(template["structure"]);
    const html = hbs({
      basics: basics,
      work: works,
      education: educations,
      projects: projects,
    });

    const shadow = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });

    // inject stylesheet to template
    const style = document.createElement("style");
    style.textContent = template["stylesheet"];

    // wrap <style/> and <body/> content
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    shadow.innerHTML = '';
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }, [
    template,
    basics,
    educations,
    works,
    projects
  ]);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <div>
        <p> {error.message} </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
});