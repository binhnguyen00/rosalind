import React from "react";

import { ArtBoard } from "@pages";
import { useResumeStore } from "@stores";
import { DefaultLayout } from "@components";
import { Button } from "@heroui/react";

export default function ResumeBuilder() {
  const resumeStore = useResumeStore();

  const updatePersonalInfo = () => {
    resumeStore.updatePersonalInfo({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890"
    });
  };

  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 h-full">
        <div className="border border-divider rounded">
          <p> left </p>
          <Button
            size="sm" color="primary"
            onPress={updatePersonalInfo}
          >
            +
          </Button>
          <Button
            size="sm" color="primary"
            onPress={resumeStore.reset}
          >
            Reset
          </Button>
        </div>
        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>
        <div className="border border-divider rounded">
          right
        </div>
      </div>
    </DefaultLayout>
  )
}