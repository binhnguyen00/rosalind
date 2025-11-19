import { cn, ScrollShadow } from "@heroui/react";
import { DefaultLayout } from "@components";
import { Resumes } from "@components/resume";

export default function Home() {
  return (
    <DefaultLayout className="p-2 md:p-4 lg:p-6 xl:p-8">
      <ScrollShadow orientation="vertical" className="h-full overflow-visible">
        <div
          className={cn(
            "grid gap-4 mt-4",
            "grid-cols-2",
            "sm:grid-cols-3",
            "md:grid-cols-4",
            "lg:grid-cols-5",
            "xl:grid-cols-6"
          )}
        >
          <Resumes />
        </div>
      </ScrollShadow>
    </DefaultLayout>
  );
}