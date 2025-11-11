import { DefaultLayout } from "@components";
import { ArtBoard, ResumeInfo, ResumeProperties } from "@pages";

export default function ResumeBuilder() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 h-full">
        <div className="border border-divider rounded">
          <ResumeInfo />
        </div>
        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>
        <div className="border border-divider rounded">
          <ResumeProperties />
        </div>
      </div>
    </DefaultLayout>
  )
}