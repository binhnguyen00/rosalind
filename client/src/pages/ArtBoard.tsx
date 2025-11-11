import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useResumeStore } from "@stores";

export default function ArtBoard() {
  const resume = useResumeStore(state => state.resume);

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
          contentStyle={{ height: "100%", overflow: "hidden" }}
          wrapperStyle={{ height: "100%", width: "100%" }}
        >
          <div className="h-full w-[1080px] text-center border">
            <p>Artboard</p>
            {JSON.stringify(resume, null, 2)}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}