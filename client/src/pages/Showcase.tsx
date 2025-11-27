import React from "react";
import HandleBars from "handlebars";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";

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

  const template = useMutation({
    mutationKey: ["get-template"],
    mutationFn: async (templateCode: string) => {
      return await pocketbase.client.collection("template").getFirstListItem(
        `code="${templateCode.toLowerCase()}"`
      );
    }
  });

  const query = useQuery({
    queryKey: ["resume-showcase", id],
    queryFn: async () => {
      const response = await pocketbase.client.collection("resume").getOne(id!);
      const content = response.content;

      resumeStore.updateId(response.id);
      resumeStore.updateFont(response.metadata.font);
      resumeStore.updateTemplate(response.metadata.template);

      basicsStore.replace(content.basics);
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

      template.mutate(resumeStore.metadata.template);

      return response;
    },
    retry: false,
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

    // inject stylesheet to template
    const style = document.createElement("style");
    style.textContent = template.data["stylesheet"];
    shadow.appendChild(style);

    // inject google fonts link
    const fontFamily = resumeStore.metadata.font.replace(/ /g, "+");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`;
    shadow.appendChild(link);

    // wrap <style/> and <body/> content
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    wrapper.style.fontFamily = resumeStore.metadata.font;
    shadow.appendChild(wrapper);

  }, [resumeStore.metadata, template]);

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
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl font-bold">404 - Page Not Found</p>
      </div>
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