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
          contentStyle={{ height: "100%" }}
          wrapperStyle={{ height: "100%", width: "100%" }}
        >
          <div className="min-h-[1122.66px] min-w-[793.8px] border">
            <div>
              <p> {resume.basics.name} </p>
              <p> {resume.basics.email} </p>
              <p> {resume.basics.phone} </p>
              <p> {resume.basics.location} </p>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

const Json = (resume: any) => {
  return (
    <pre className="flex flex-col justify-center items-center text-left font-mono whitespace-pre-wrap">
      {JSON.stringify(resume, null, 2)}
    </pre>
  )
}