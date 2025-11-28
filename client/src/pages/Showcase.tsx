import React from "react";
import HandleBars from "handlebars";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";

import { NotFound } from "@pages";
import { PocketBaseContext } from "@components";
import {
  useBasicsStore, useEducationStore, useResumeStore, useWorkStore,
  useInterestStore, usePublicationStore, useReferenceStore, useSkillStore,
  useProjectsStore, useVolunteerStore, useAwardStore, useCertificateStore,
} from "@stores";

export default function Showcase() {
  const { id } = useParams();
  const pocketbase = React.useContext(PocketBaseContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const resumeStore = useResumeStore();
  const basicsStore = useBasicsStore();
  const educationsStore = useEducationStore();
  const workStore = useWorkStore();
  const projectsStore = useProjectsStore();
  const volunteerStore = useVolunteerStore();
  const awardsStore = useAwardStore();
  const certificatesStore = useCertificateStore();
  const interestsStore = useInterestStore();
  const publicationsStore = usePublicationStore();
  const referencesStore = useReferenceStore();
  const skillsStore = useSkillStore();

  const query = useQuery({
    queryKey: ["resume-showcase", id],
    queryFn: async () => {
      const response = await pocketbase.client.collection("resume").getOne(id!);
      const content = response.content;

      resumeStore.updateId(response.id);
      resumeStore.updateFont(response.metadata.font);
      resumeStore.updateTemplate(response.metadata.template);

      basicsStore.replace(content.basics);
      educationsStore.replace(content.education);
      projectsStore.replace(content.projects);
      workStore.replace(content.work);
      volunteerStore.replace(content.volunteer);
      awardsStore.replace(content.awards);
      certificatesStore.replace(content.certificates);
      interestsStore.replace(content.interests);
      publicationsStore.replace(content.publications);
      referencesStore.replace(content.references);
      skillsStore.replace(content.skills);

      return response;
    },
    retry: false,
  });

  const template = useQuery({
    queryKey: ["get-template", resumeStore.metadata.template],
    queryFn: async () => {
      if (!resumeStore.metadata.template) return null;
      return await pocketbase.client.collection("template").getFirstListItem(
        `code="${resumeStore.metadata.template.toLowerCase()}"`
      );
    },
    enabled: resumeStore.metadata.template ? true : false,
  });

  React.useEffect(() => {
    if (!containerRef.current) return;
    if (!resumeStore.metadata.template) return;
    if (!template.data) return;
    if (template.isError) return;

    const hbs = HandleBars.compile(template.data["structure"]);
    const html = hbs({
      basics: basicsStore.store,
      work: workStore.store,
      education: educationsStore.store,
      projects: projectsStore.store,
      volunteer: volunteerStore.store,
      awards: awardsStore.store,
      certificates: certificatesStore.store,
      interests: interestsStore.store,
      publications: publicationsStore.store,
      references: referencesStore.store,
      skills: skillsStore.store,
    });
    const shadow = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });
    shadow.innerHTML = "";

    // inject stylesheet
    const style = document.createElement("style");
    style.textContent = template.data["stylesheet"];
    shadow.appendChild(style);

    // wrap <style/> and <body/> content
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    wrapper.style.fontFamily = resumeStore.metadata.font;
    shadow.appendChild(wrapper);

  }, [template.data, resumeStore.metadata.template, resumeStore.metadata.font]);

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (query.isError) {
    console.error(query.error.message);
    return (
      <NotFound />
    )
  }

  return (
    <div className="flex justify-center items-center h-full p-6">
      <div
        ref={containerRef}
        className="h-full w-[793.8px] shadow-lg"
      />
    </div>
  )
}