import React from "react";

import { Basics, Education, Work } from "@pages/resume";

export default function ResumeInfoPane() {
  return (
    <div className="flex flex-col gap-4">

      <Basics />
      <Work />
      <Education />

    </div>
  )
}