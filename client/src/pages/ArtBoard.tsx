import React from "react";
import HandleBars from "handlebars";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { PocketBaseContext } from "@components";
import { useBasicsStore, useEducationStore, useResumeStore } from "@stores";

export default function ArtBoard() {

  return (
    <div className="w-full h-screen overflow-hidden">
      <TransformWrapper
        centerOnInit
        maxScale={2}
        minScale={0.4}
        initialScale={0.8}
        limitToBounds={false}
      >
        <TransformComponent
          contentClass="grid items-start justify-center pointer-events-none"
          contentStyle={{ height: "100%" }}
          wrapperStyle={{ height: "100%", width: "100%" }}
        >
          <div className="min-h-[1122.66px] w-[793.8px] border">
            <Template />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

function Template() {
  const metadata = useResumeStore(state => state.metadata);
  const basics = useBasicsStore(state => state.store);
  const educations = useEducationStore(state => state.store);
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

  React.useEffect(() => {
    if (!template) return;
    if (!containerRef.current) return;

    const hbs = HandleBars.compile(template["structure"]);
    const html = hbs({
      basics: basics,
      education: educations,
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
  }, [template, basics, educations]);

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
      className="w-full h-full p-6"
    />
  );
}