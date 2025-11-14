import React from "react";
import axios from "axios";
import HandleBars from "handlebars";

import { RecordModel } from "pocketbase";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@heroui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileDown, ZoomIn, ZoomOut, FlipHorizontal } from "lucide-react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import { PocketBaseContext } from "@components";
import {
  useBasicsStore, useEducationStore, useResumeStore, useWorkStore,
  useProjectsStore
} from "@stores";

export default function ArtBoard() {
  const pocketBase = React.useContext(PocketBaseContext);
  const templateRef = React.useRef<HTMLDivElement>(null); // [BUG] templateRef is not always != null;

  const resumeStore = useResumeStore();
  const basicsStore = useBasicsStore();
  const educationsStore = useEducationStore();
  const workStore = useWorkStore();
  const projectsStore = useProjectsStore();

  const { id } = useParams();
  const mode = id ? "update" : "create";

  const { isLoading, isError } = useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      if (!id) return;
      const response = await pocketBase.collection<RecordModel>("resume").getOne(id);
      const content = response.content;

      resumeStore.updateId(response.id);
      basicsStore.update(content.basics);
      educationsStore.replace(content.education);
      projectsStore.replace(content.projects);
      workStore.replace(content.work);

      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
    refetchOnMount: mode === "update",
  });

  const { mutate } = useMutation({
    mutationKey: ["export"],
    mutationFn: async (html: string) => {
      const response = await axios.post(`${pocketBase.baseURL}/resume/export`, {
        html: html,
      }, {
        headers: {
          "Authorization": pocketBase.authStore.token,
        },
        responseType: "blob"
      });
      return response.data;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
    onSuccess: (bytes) => {
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const onExport = () => {
    if (!templateRef.current) return;
    const shadow = templateRef.current.shadowRoot;
    if (!shadow) {
      console.log("shadowRoot is null");
      return
    };

    const styleNode = shadow.querySelector("style");
    const wrapperNode = shadow.querySelector("div.container");

    const styleHtml = styleNode ? styleNode.outerHTML : "";
    const bodyHtml = wrapperNode ? wrapperNode.outerHTML : "";

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        ${styleHtml}
      </head>
      <body>
        ${bodyHtml}
      </body>
    </html>
    `

    mutate(html);
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
          onPress={() => centerView(0.8)}
        >
          <FlipHorizontal size={18} />
        </Button>
      </div>
    )
  };

  // ensure templateRef is not null
  React.useEffect(() => {
    if (!templateRef.current) {
      console.log("templateRef is null");
      return;
    }
    const shadow = templateRef.current.shadowRoot;
    if (!shadow) {
      console.log("shadowRoot is null");
      return
    };
    const styleNode = shadow.querySelector("style");
    const wrapperNode = shadow.querySelector("div.container");
  }, [templateRef.current?.shadowRoot?.innerHTML]);

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
  const projects = useProjectsStore(state => state.store);

  const pocketBase = React.useContext(PocketBaseContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { data: template, isLoading, isError, error } = useQuery({
    queryKey: ["template", metadata.template],
    queryFn: async () => {
      return await pocketBase.collection("template").getFirstListItem(
        `code="${metadata.template}"`
      );
    },
  });

  // expose containerRef to parent component
  React.useImperativeHandle(ref, () => containerRef.current!, [containerRef.current]);

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

    shadow.innerHTML = "";
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

  }, [template, basics, educations, works, projects]);

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