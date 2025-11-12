import React from "react";
import HandleBars from "handlebars";
import { useQuery } from "@tanstack/react-query";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";
import { Spinner } from "@heroui/react";

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
          <div className="min-h-[1122.66px] min-w-[793.8px] border">
            <Template />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

function Template() {
  const resume = useResumeStore(state => state.resume);
  const pocketBase = React.useContext(PocketBaseContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { data: template, isLoading, isError, error } = useQuery({
    queryKey: ["template", resume.metadata.template],
    queryFn: async () => {
      return await pocketBase.collection("template").getFirstListItem(
        `code="${resume.metadata.template}"`
      );
    }
  });

  React.useEffect(() => {
    if (!template) return;
    if (!containerRef.current) return;
    const hbs = HandleBars.compile(template["structure"]);
    const html = hbs({
      ...resume,
      stylesheet: template["stylesheet"]
    });
    const shadow = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });
    shadow.innerHTML = html;
  }, [template, resume]);

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

const Json = (resume: any) => {
  return (
    <pre className="flex flex-col justify-center items-center text-left font-mono whitespace-pre-wrap">
      {JSON.stringify(resume, null, 2)}
    </pre>
  )
}