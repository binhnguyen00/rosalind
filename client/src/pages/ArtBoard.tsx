import React from "react";
import axios from "axios";
import HandleBars from "handlebars";

import { RecordModel } from "pocketbase";
import { useParams } from "react-router-dom";
import { Button, Spinner, Tooltip, addToast } from "@heroui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FileDown, ZoomIn, ZoomOut, FlipHorizontal, Save } from "lucide-react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import { PocketBaseContext } from "@components";
import {
  useBasicsStore, useEducationStore, useResumeStore, useWorkStore,
  useProjectsStore
} from "@stores";

export default function ArtBoard() {
  const pocketBase = React.useContext(PocketBaseContext);
  const templateRef = React.useRef<TemplateRefProps>(null);

  const resumeStore = useResumeStore();
  const basicsStore = useBasicsStore();
  const educationsStore = useEducationStore();
  const workStore = useWorkStore();
  const projectsStore = useProjectsStore();

  const { id } = useParams();
  const mode = id ? "update" : "create";

  const { isLoading, isError } = useQuery({
    queryKey: ["get-resume", id],
    queryFn: async () => {
      if (!id) return;
      const response = await pocketBase.collection<RecordModel>("resume").getOne(id);
      const content = response.content;

      resumeStore.updateId(response.id);
      basicsStore.update(content.basics);
      educationsStore.replace(content.education);
      projectsStore.replace(content.projects);
      workStore.replace(content.work);

      console.log(response);
      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
    refetchOnMount: mode === "update",
  });

  const { mutate: exportPdf, isPending: isExporting } = useMutation({
    mutationKey: ["export-pdf", id],
    mutationFn: async (html: string) => {
      const post = axios.post(`${pocketBase.baseURL}/resume/export`, {
        id: id,
        content: {
          basics: basicsStore.store,
          education: educationsStore.store,
          work: workStore.store,
          projects: projectsStore.store,
          // more...
        },
        html: html,
      }, {
        headers: { "Authorization": pocketBase.authStore.token },
        responseType: "blob"
      });

      addToast({ title: "Exporting...", color: "primary", promise: post });

      const response = await post;
      return response.data;
    },
    retry(failureCount, error) {
      return failureCount < 1;
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
      addToast({ title: "Export Success", color: "success" })
    },
    onError: (error) => {
      addToast({ title: "Export Failed", description: error.message, color: "danger" })
    }
  })

  const { mutate: saveResume, isPending: isSaving } = useMutation({
    mutationKey: ["save-resume", id],
    mutationFn: async () => {
      const post = axios.post(`${pocketBase.baseURL}/resume/save`, {
        id: id,
        content: {
          basics: basicsStore.store,
          education: educationsStore.store,
          work: workStore.store,
          projects: projectsStore.store,
          // more...
        },
      }, {
        headers: { "Authorization": pocketBase.authStore.token },
        responseType: "json"
      });

      const response = await post;
      return response.data;
    },
    retry: (failureCount, error) => failureCount < 1,
    onSuccess: (response) => {
      if (response.isSuccess) {
        addToast({ title: "Save Success", color: "success" });
      }
    },
    onError: (error) => {
      addToast({ title: "Save Failed", description: error.message, color: "danger" });
    }
  })

  const onExport = () => {
    if (!templateRef.current) return;
    const htmlStr: string = templateRef.current.getArtboardHTML();

    const html = `
      <!DOCTYPE html>
      <html>
        ${htmlStr}
      </html>
    `;

    exportPdf(html);
  };

  const onSave = () => {
    saveResume();
  }

  const Controls = () => {
    const { zoomIn, zoomOut, centerView } = useControls();

    return (
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-2">
        <Tooltip content="Zoom In" placement="left">
          <Button
            variant="solid" size="md" color="primary" isIconOnly
            onPress={() => zoomIn(0.2)}
          >
            <ZoomIn size={20} />
          </Button>
        </Tooltip>
        <Tooltip content="Zoom Out" placement="left">
          <Button
            variant="solid" size="md" color="primary" isIconOnly
            onPress={() => zoomOut(0.2)}
          >
            <ZoomOut size={20} />
          </Button>
        </Tooltip>
        <Tooltip content="Center View" placement="left">
          <Button
            variant="solid" size="md" color="primary" isIconOnly
            onPress={() => centerView(0.8)}
          >
            <FlipHorizontal size={20} />
          </Button>
        </Tooltip>
        <Tooltip content="Export PDF" placement="left">
          <Button
            variant="solid" size="md" color="primary" isIconOnly isLoading={isExporting}
            onPress={onExport}
          >
            <FileDown size={20} />
          </Button>
        </Tooltip>
        <Tooltip content="Save" placement="left">
          <Button
            variant="solid" size="md" color="primary" isIconOnly isLoading={isSaving}
            onPress={onSave}
          >
            <Save size={20} />
          </Button>
        </Tooltip>
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
          <Controls />
          <TransformComponent
            contentClass="grid items-start justify-center pointer-events-none"
            contentStyle={{ height: "100%" }}
            wrapperStyle={{ height: "100%", width: "100%" }}
          >
            <div className="min-h-[1122.66px] w-[793.8px] border">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[1122.66px] w-[793.8px]">
                  <Spinner />
                </div>
              ) : (
                <Template ref={templateRef} />
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

    </div>
  )
}

interface TemplateRefProps {
  isRefReady: boolean;
  getArtboardHTML: () => string;
}

const Template = React.forwardRef<TemplateRefProps>((props, ref) => {
  const metadata = useResumeStore(state => state.metadata);
  const basics = useBasicsStore(state => state.store);
  const educations = useEducationStore(state => state.store);
  const works = useWorkStore(state => state.store);
  const projects = useProjectsStore(state => state.store);

  const [height, setHeight] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
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
  React.useImperativeHandle(ref, () => ({
    isRefReady: !!containerRef.current,
    getArtboardHTML: () => {
      if (!containerRef.current) {
        console.warn("containerRef is empty");
        return "";
      };
      const shadow = containerRef.current.shadowRoot;
      if (!shadow) {
        console.warn("shadowRoot is empty");
        return "";
      }
      return shadow.innerHTML;
    },
  }));

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
    const body = shadow.appendChild(wrapper);

    // Observe the wrapper for height changes
    const observer = new ResizeObserver(() => {
      setHeight(body.offsetHeight);
      setPageCount(Math.ceil(body.offsetHeight / 1122.66));
    });
    observer.observe(wrapper);

    return () => observer.disconnect();

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
    <>
      <div
        ref={containerRef}
        className="w-full h-full"
      />
      {Array.from({ length: pageCount - 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 w-full"
          style={{ top: `${(i + 1) * 1122.66}px` }}
        >
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 mr-2">Page {i + 1}</span>
            <div className="w-full border-t-2 border-dashed border-gray-600" />
          </div>
        </div>
      ))}
    </>
  );
});