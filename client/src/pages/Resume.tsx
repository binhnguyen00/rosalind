import { DefaultLayout } from "@components";

export default function Resume() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 h-full">
        <div className="border border-divider rounded">
          left
        </div>
        <div className="border border-divider rounded overflow-hidden h-full min-h-0">
          <iframe
            src="/artboard"
            title="artboard"
            className="w-full h-full"
          />
        </div>
        <div className="border border-divider rounded">
          right
        </div>
      </div>
    </DefaultLayout>
  )
}